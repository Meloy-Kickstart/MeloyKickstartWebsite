import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

// Using untyped req/res to avoid requiring @vercel/node types locally.
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server not configured: missing GEMINI_API_KEY" });
  }

  let prompt: string | undefined;
  let useSearch: boolean | undefined;
  let useRag: boolean | undefined;
  let question: string | undefined;
  try {
    if (typeof req.body === "string") {
      const parsed = JSON.parse(req.body);
      prompt = parsed?.prompt;
      useSearch = !!parsed?.useSearch;
      useRag = !!parsed?.useRag;
      question = parsed?.question;
    } else if (req.body && typeof req.body === "object") {
      prompt = (req.body as any)?.prompt;
      useSearch = !!(req.body as any)?.useSearch;
      useRag = !!(req.body as any)?.useRag;
      question = (req.body as any)?.question;
    }
  } catch (_) {
    // ignore body parse errors; will fall back to validation below
  }
  if (!prompt || typeof prompt !== "string" || prompt.length < 4) {
    return res.status(400).json({ error: "Missing or invalid 'prompt'" });
  }

  // Simple request size guard
  if (prompt.length > 12000) {
    return res.status(400).json({ error: "Prompt too large" });
  }

  try {
    // Initialize client explicitly with API key
    const ai = new GoogleGenAI({ apiKey });

    // Optional: simple, file-based RAG over TAMUStartup.txt embeddings
    const ragAugmented = await maybeAugmentWithRag(prompt, ai, useRag, question);

    const tools = useSearch ? [{ googleSearch: {} }] : undefined;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: ragAugmented,
      config: tools ? { tools } : undefined,
    });

    const text: string = (response as any)?.text ?? "";
    const candidate = (response as any)?.candidates?.[0];
    const gm = candidate?.groundingMetadata;
    const chunks: any[] = gm?.groundingChunks || [];

    // Build a distinct list of citations from grounding chunks
    const citations = chunks
      .map((c, idx) => {
        const uri = c?.web?.uri || c?.url || c?.uri;
        const title = c?.web?.title || c?.title || uri || `Source ${idx + 1}`;
        return uri ? { uri, title } : null;
      })
      .filter(Boolean)
      // Deduplicate by URI
      .filter((c: any, i: number, arr: any[]) => arr.findIndex((x: any) => x.uri === c.uri) === i);

    return res.status(200).json({ text: text?.trim?.() || "", citations });
  } catch (err: any) {
    const msg = err?.message || "Gemini request failed";
    return res.status(500).json({ error: msg });
  }
}

// ------------------------
// Simple server-side RAG
// ------------------------

type RagEntry = { id: number; text: string; embedding: number[] };
let RAG_INDEX: RagEntry[] | null = null;

function loadRagIndexOnce(): RagEntry[] | null {
  if (RAG_INDEX) return RAG_INDEX;
  try {
    const file = path.join(process.cwd(), "rag", "tamu-embeddings.json");
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf-8");
      RAG_INDEX = JSON.parse(raw) as RagEntry[];
      return RAG_INDEX;
    }
  } catch (_) {
    // ignore
  }
  return null;
}

function cosineSim(a: number[], b: number[]) {
  let dot = 0,
    na = 0,
    nb = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const x = a[i];
    const y = b[i];
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

async function maybeAugmentWithRag(
  originalPrompt: string,
  ai: GoogleGenAI,
  useRag?: boolean,
  question?: string
) {
  if (!useRag) return originalPrompt;
  const index = loadRagIndexOnce();
  if (!index || !Array.isArray(index) || index.length === 0) return originalPrompt;
  const q = (question || originalPrompt).slice(0, 4000);

  // Get query embedding via Gemini
  try {
    const embResp = await (ai.models as any).embedContent({
      model: "text-embedding-004",
      content: { parts: [{ text: q }] },
    } as any);
    const qv: number[] = (embResp as any)?.embedding?.values || (embResp as any)?.data?.[0]?.embedding || [];
    if (!qv || qv.length === 0) return originalPrompt;

    // Score and pick top chunks
    const scored = index
      .map((e) => ({ e, s: cosineSim(qv, e.embedding) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 6);

    const ctx = scored
      .map(({ e }, i) => `[[${i + 1}]]\n${e.text}`)
      .join("\n\n---\n\n");

    const guidance = [
      "System:",
      "You are the Meloy Kickstart TAMU entrepreneurship assistant.",
      "Answer directly and confidently when the answer is present in Context. Avoid hedging like 'I'm not sure' when the Context clearly contains the answer.",
      "If the answer truly is not in Context, say so briefly and suggest Discord for real-time help.",
      "Cite any specific programs and include links if present in the Context.",
    ].join(" \n");

    const augmented = [
      `${guidance}`,
      "\nContext (RAG):\n" + ctx,
      "\n---\n",
      originalPrompt,
    ].join("\n\n");

    return augmented;
  } catch (_err) {
    return originalPrompt;
  }
}
