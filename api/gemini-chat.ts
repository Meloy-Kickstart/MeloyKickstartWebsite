import { GoogleGenAI } from "@google/genai";

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
  try {
    if (typeof req.body === "string") {
      const parsed = JSON.parse(req.body);
      prompt = parsed?.prompt;
      useSearch = !!parsed?.useSearch;
    } else if (req.body && typeof req.body === "object") {
      prompt = (req.body as any)?.prompt;
      useSearch = !!(req.body as any)?.useSearch;
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
  // Rely on GEMINI_API_KEY env var; pass empty options per library docs
  const ai = new GoogleGenAI({});
    const config = useSearch ? { tools: [{ googleSearch: {} }] } : undefined;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config,
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
