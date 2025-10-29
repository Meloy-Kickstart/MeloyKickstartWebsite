import { useMemo, useRef, useState } from "react";
import TAMU_DOC from "../../TAMUStartup.txt?raw";

type Citation = { uri: string; title: string };
type ChatMsg = {
  role: "user" | "assistant";
  text: string;
  citations?: Citation[];
};

const DISCORD =
  import.meta.env.VITE_DISCORD_INVITE || "https://discord.gg/34MX3ETzxk";

// Rough-and-ready keyword scorer for small documents
function topRelevantChunks(
  query: string,
  text: string,
  maxChunks = 6,
  maxChars = 6000
) {
  const q = query.toLowerCase();
  const tokens = q.split(/[^a-z0-9]+/).filter(Boolean);
  const stops = new Set([
    "a",
    "an",
    "and",
    "the",
    "or",
    "for",
    "to",
    "of",
    "in",
    "on",
    "at",
    "is",
    "are",
    "be",
    "with",
    "by",
    "about",
    "from",
    "this",
    "that",
    "it",
    "as",
    "into",
    "you",
    "your",
  ]);
  const keys = tokens.filter((t) => !stops.has(t) && t.length > 1);
  const chunks = text
    .split(/\n\*\*\*\n|\n---\n|\n{2,}/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const scored = chunks.map((c, i) => {
    const low = c.toLowerCase();
    let score = 0;
    for (const k of keys) {
      const matches = low.split(k).length - 1;
      score += matches * (k.length >= 4 ? 2 : 1);
    }
    // Slight boost if looks like a heading block
    if (/^#+\s|\*\*.+\*\*/.test(c)) score += 1;
    return { idx: i, score, text: c };
  });

  scored.sort((a, b) => b.score - a.score);
  const picked: string[] = [];
  let total = 0;
  for (const s of scored.slice(0, maxChunks * 2)) {
    if (s.score <= 0) continue;
    if (total + s.text.length > maxChars) break;
    picked.push(s.text);
    total += s.text.length;
    if (picked.length >= maxChunks) break;
  }
  // Fallback: if nothing scored, include the first two sections
  if (picked.length === 0) {
    for (const c of chunks.slice(0, 2)) {
      if (total + c.length > maxChars) break;
      picked.push(c);
      total += c.length;
    }
  }
  return picked;
}

function shouldUseSearch(q: string) {
  const s = q.toLowerCase();
  const hasYear = /(20\d{2})/.test(s);
  const hasMonth =
    /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december)/.test(
      s
    );
  const timeWords =
    /(when|deadline|date|schedule|upcoming|latest|now|today|tomorrow|next|this\s+(week|month|semester|fall|spring))/;
  const complex =
    q.length > 180 || /compare|versus|difference|pros and cons/.test(s);
  return hasYear || hasMonth || timeWords.test(s) || complex;
}

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      text: "I’m the Meloy Kickstart club chatbot — the engineering entrepreneurship club at Texas A&M (part of the Meloy program). Ask about Meloy offerings, McFerrin competitions, internships, makerspaces, and more.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Using serverless proxy; no client key required
  const ai = useMemo(() => true, []);

  const ask = async () => {
    const q = input.trim();
    if (!q) return;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setInput("");

    const contextChunks = topRelevantChunks(q, TAMU_DOC, 6, 8000);
    const useSearch = shouldUseSearch(q);
    const identity = `You are the chatbot for Meloy Kickstart — the engineering entrepreneurship club at Texas A&M University, which is a subset of the Meloy program.`;
    const sys = useSearch
      ? `${identity} Prefer the provided Context, but you MAY use Google Search for date-specific or real-time details. Include links when possible. Keep answers concise. If the answer is present in Context, answer directly and avoid hedging like “I'm not sure.” If it’s truly not present, say so briefly and suggest joining our Discord (${DISCORD}).`
      : `${identity} Answer ONLY using the provided Context. When the answer exists in Context, answer confidently and directly and avoid hedging like “I'm not sure.” If it’s truly not in Context, say so briefly and suggest joining our Discord (${DISCORD}). Keep answers concise and include specific program names and links from Context.`;

    const prompt = [
      `System:\n${sys}`,
      `Context:\n${contextChunks.join("\n\n---\n\n")}`,
      `Question: ${q}`,
      `Answer:`,
    ].join("\n\n");

    setLoading(true);
    try {
      const resp = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, useSearch, useRag: true, question: q }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || "Request failed");
      const answer = (data?.text as string)?.trim() || "(No response)";
      const citations = (data?.citations as Citation[]) || [];
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: answer, citations },
      ]);
    } catch (err: any) {
      const msg = err?.message || "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `${msg}\n\nIf this persists, email pranavuttarkar@tamu.edu or hop into Discord: ${DISCORD}`,
        },
      ]);
    } finally {
      setLoading(false);
      // Scroll to bottom
      setTimeout(
        () => listRef.current?.scrollTo({ top: 1e9, behavior: "smooth" }),
        50
      );
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) void ask();
    }
  };

  return (
    <section id="chat" className="section">
      <h2 className="section-title">Ask about Entrepreneurship @ TAMU</h2>
      <p className="text-zinc-300/90 mt-3 max-w-3xl">
        I’m grounded on TAMU entrepreneurship resources (Meloy, McFerrin,
        competitions, makerspaces). I’ll cite items from our context. For
        real-time help, join our Discord.
      </p>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="card p-0 overflow-hidden">
          <div
            ref={listRef}
            className="max-h-[420px] overflow-auto px-4 py-4 space-y-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <div
                  className={`inline-block max-w-full rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-violet-500/15 border border-violet-500/30"
                      : "bg-surface-800/60 border border-white/10"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">
                    {m.text}
                  </div>
                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-white/10 text-xs">
                      <div className="opacity-80 mb-1">Sources:</div>
                      <ul className="space-y-1">
                        {m.citations.map((c, idx) => (
                          <li key={idx}>
                            <a
                              className="text-violet-neon hover:underline"
                              href={c.uri}
                              target="_blank"
                              rel="noreferrer"
                            >
                              [{idx + 1}] {c.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block rounded-xl px-4 py-3 text-sm bg-surface-800/60 border border-white/10 animate-pulse">
                  Thinking…
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-white/10 p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="e.g., What is Aggie PITCH and when is it?"
              className="flex-1 rounded-lg bg-surface-900/60 border border-white/10 px-3 py-2 outline-none focus:border-violet-neon/60"
            />
            <button
              onClick={ask}
              disabled={loading || !input.trim()}
              className="button-primary"
            >
              Ask
            </button>
          </div>
        </div>
        <div className="card space-y-3 text-zinc-300/90">
          <p className="text-sm">Tips:</p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li>
              Ask about specific programs (Meloy Fellows, Innovators,
              Internships).
            </li>
            <li>
              Competitions: Aggie PITCH, Good Bull Pitch, Ideas Challenge, TNVC.
            </li>
            <li>
              Resources: McFerrin Center, FEDC makerspace, Startup Aggieland.
            </li>
          </ul>
          <p className="text-sm pt-1">
            Need a human? Email{" "}
            <a className="hover:underline" href="mailto:njohannessen@tamu.edu">
              njohannessen@tamu.edu
            </a>{" "}
            or join our{" "}
            <a
              className="text-violet-neon hover:underline"
              href={DISCORD}
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
            .
          </p>
          {/* No client key needed with serverless proxy */}
        </div>
      </div>
    </section>
  );
};
