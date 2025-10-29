import { useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const Join = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const href = useMemo(() => {
    const to = "njohannessen@tamu.edu";
    const subject = encodeURIComponent("Join Meloy Kickstart — Notify Me");
    const body = encodeURIComponent(
      `Please add me to the mailing list.\nEmail: ${email}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }, [email]);

  const ok = /.+@.+\..+/.test(email);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!ok) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("join_emails").insert({
        email,
        source: "join",
      });
      if (error) throw error;
      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="join" className="section">
      <h2 className="section-title">Stay in the Loop.</h2>
      <p className="text-zinc-300/90 mt-4 max-w-2xl">
        Enter your email and we’ll send upcoming meetings and opportunities. Or
        join the conversation on our{" "}
        <a
          href="https://discord.gg/34MX3ETzxk"
          target="_blank"
          rel="noreferrer"
          className="text-violet-neon hover:underline"
        >
          Discord
        </a>
        .
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.name@tamu.edu"
          className="flex-1 rounded-xl bg-surface-800/60 border border-white/10 px-4 py-3 outline-none focus:border-violet-neon/60"
        />
        <button
          type="submit"
          disabled={!ok || submitting}
          className={`button-secondary text-center ${
            !ok || submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitted ? "Thanks!" : submitting ? "Submitting…" : "Get Notified"}
        </button>
      </form>
      {error ? <p className="text-rose-300 text-sm mt-2">{error}</p> : null}
    </section>
  );
};
