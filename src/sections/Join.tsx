import { useMemo, useState } from "react";

export const Join = () => {
  const [email, setEmail] = useState("");
  const href = useMemo(() => {
    const to = "meloykickstart@tamu.edu";
    const subject = encodeURIComponent("Join Meloy Kickstart — Notify Me");
    const body = encodeURIComponent(
      `Please add me to the mailing list.\nEmail: ${email}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }, [email]);

  const ok = /.+@.+\..+/.test(email);

  return (
    <section id="join" className="section">
      <h2 className="section-title">Stay in the Loop.</h2>
      <p className="text-zinc-300/90 mt-4 max-w-2xl">
        Enter your email and we’ll send upcoming meetings and opportunities.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.name@tamu.edu"
          className="flex-1 rounded-xl bg-surface-800/60 border border-white/10 px-4 py-3 outline-none focus:border-violet-neon/60"
        />
        <a
          href={ok ? href : undefined}
          aria-disabled={!ok}
          className={`button-secondary text-center ${
            !ok ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Get Notified
        </a>
      </div>
    </section>
  );
};
