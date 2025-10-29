#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { GoogleGenAI } from "@google/genai";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "TAMUStartup.txt");
const OUTDIR = path.join(ROOT, "rag");
const OUTFILE = path.join(OUTDIR, "tamu-embeddings.json");

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Missing GEMINI_API_KEY");
    process.exit(1);
  }
  if (!fs.existsSync(INPUT)) {
    console.error("Could not find TAMUStartup.txt at project root");
    process.exit(1);
  }
  const text = fs.readFileSync(INPUT, "utf-8");
  const chunks = splitIntoChunks(text, 1200, 200);
  console.log(`Chunked into ${chunks.length} sections`);

  const ai = new GoogleGenAI({ apiKey });
  const entries = [];
  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    try {
      const embedding = await getEmbedding(ai, c);
      if (!embedding || embedding.length === 0) throw new Error("No embedding");
      entries.push({ id: i, text: c, embedding });
      if ((i + 1) % 10 === 0) console.log(`Embedded ${i + 1}/${chunks.length}`);
    } catch (e) {
      console.error(`Embedding failed for chunk ${i}:`, e?.message || e);
    }
  }

  fs.mkdirSync(OUTDIR, { recursive: true });
  fs.writeFileSync(OUTFILE, JSON.stringify(entries, null, 2));
  console.log(`Wrote ${entries.length} vectors to ${OUTFILE}`);
}

async function getEmbedding(ai, text) {
  // Prefer the documented embedding API shape per Gemini docs
  // https://cloud.google.com/vertex-ai/docs/generative-ai/reference/rest
  const model = "gemini-embedding-001";
  try {
    // Send contents as an array (docs show `contents: [...]`)
    const resp = await ai.models.embedContent({
      model,
      contents: [text],
      taskType: "RETRIEVAL_DOCUMENT",
    });
    // SDKs may return embeddings in a few shapes; try common fields
    const embeddings =
      resp?.embeddings ||
      resp?.data ||
      resp?.embedding ||
      resp?.embeddings?.values;
    // resp.embeddings may be an array of objects with `values`
    if (Array.isArray(resp?.embeddings) && resp.embeddings[0]?.values)
      return resp.embeddings[0].values;
    if (Array.isArray(resp?.data) && resp.data[0]?.embedding)
      return resp.data[0].embedding;
    if (resp?.embedding?.values) return resp.embedding.values;
    if (Array.isArray(embeddings) && embeddings[0]?.values)
      return embeddings[0].values;
    if (Array.isArray(embeddings) && typeof embeddings[0] === "number")
      return embeddings; // sometimes embeddings is the vector itself
  } catch (err) {
    console.error(
      "embedContent (docs shape) failed:",
      err?.response?.data || err?.message || err
    );
  }

  // Fallback: try a single-string contents field (some variants accept string)
  try {
    const resp2 = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text,
      taskType: "RETRIEVAL_DOCUMENT",
    });
    if (Array.isArray(resp2?.embeddings) && resp2.embeddings[0]?.values)
      return resp2.embeddings[0].values;
    if (Array.isArray(resp2?.data) && resp2.data[0]?.embedding)
      return resp2.data[0].embedding;
    if (resp2?.embedding?.values) return resp2.embedding.values;
    if (Array.isArray(resp2) && typeof resp2[0] === "number") return resp2;
  } catch (err) {
    console.error(
      "embedContent (single-string fallback) failed:",
      err?.response?.data || err?.message || err
    );
  }

  // If all documented shapes fail, try previously attempted experimental shapes for compatibility
  const attempts = [
    { model: "text-embedding-004", content: { parts: [{ text }] } },
    { model: "text-embedding-004", requests: [{ input: [text] }] },
    { model: "text-embedding-004", requests: [{ input: [{ text }] }] },
    { model: "text-embedding-004", requests: [{ input: [{ content: text }] }] },
    { model: "text-embedding-004", input: [text] },
    { model: "text-embedding-004", input: [{ text }] },
    { model: "text-embedding-004", content: text },
    { model: "text-embedding-004", instances: [{ text }] },
  ];

  for (let i = 0; i < attempts.length; i++) {
    const payload = attempts[i];
    try {
      const resp = await ai.models.embedContent(payload);
      const embedding =
        resp?.data?.[0]?.embedding ||
        resp?.embedding?.values ||
        resp?.embedding ||
        resp?.data?.[0]?.embedding?.values;
      if (embedding && embedding.length) return embedding;
    } catch (err) {
      console.error(
        `  experimental attempt ${i + 1} failed:`,
        err && (err.response?.data || err.message || err)
      );
    }
  }

  throw new Error("All embedding payload variants failed");
}

function splitIntoChunks(text, target = 1000, overlap = 150) {
  const paras = text
    .split(/\n\*\*\*\n|\n---\n|\n{2,}/g)
    .map((s) => s.trim())
    .filter(Boolean);
  const chunks = [];
  let cur = "";
  for (const p of paras) {
    if ((cur + "\n\n" + p).length > target && cur) {
      chunks.push(cur);
      // start next with overlap tail
      cur = tail(cur, overlap) + (cur ? "\n\n" : "") + p;
    } else {
      cur = (cur ? cur + "\n\n" : "") + p;
    }
    if (cur.length >= target * 1.5) {
      chunks.push(cur);
      cur = "";
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

function tail(s, n) {
  if (!s || n <= 0) return "";
  return s.slice(-n);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
