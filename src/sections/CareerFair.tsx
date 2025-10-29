import { useMemo, useState } from "react";

export const CareerFair = () => {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const to = "meloykickstart@tamu.edu";
    const subject = encodeURIComponent(
      "Partner with Meloy Kickstart — Startup Career Fair"
    );
    const body = encodeURIComponent(
      `Company: ${company}\nEmail: ${email}\n\nInterest: ${message}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }, [company, email, message]);

  const valid = company.trim().length > 1 && /.+@.+\..+/.test(email);

  return (
    <section id="partner" className="section">
      <h2 className="section-title">Startup Career Fair.</h2>
      <p className="text-zinc-300/90 mt-4 max-w-3xl">
        Each year, Meloy Kickstart hosts a career fair connecting innovative
        startups with Texas A&M’s brightest engineering talent.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div className="card">
          <h3 className="font-semibold text-xl">Partner with Us</h3>
          <p className="text-zinc-300/90 mt-2">
            Tell us about your company and what talent you’re looking for. We’ll
            get back to you quickly.
          </p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm text-zinc-300/80 mb-2">
                Company Name
              </label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., QuantumForge Labs"
                className="w-full rounded-xl bg-surface-800/60 border border-white/10 px-4 py-3 outline-none focus:border-violet-neon/60"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300/80 mb-2">
                Contact Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@startup.com"
                type="email"
                className="w-full rounded-xl bg-surface-800/60 border border-white/10 px-4 py-3 outline-none focus:border-violet-neon/60"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300/80 mb-2">
                Message / Interest Description
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="What roles are you hiring? Internship or full-time?"
                className="w-full rounded-xl bg-surface-800/60 border border-white/10 px-4 py-3 outline-none focus:border-violet-neon/60"
              />
            </div>

            <div className="pt-2">
              <a
                href={valid ? mailtoHref : undefined}
                aria-disabled={!valid}
                className={`button-primary inline-block ${
                  !valid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Partner with Us
              </a>
            </div>
          </form>
        </div>

        <div className="card">
          <div className="space-y-3 text-zinc-300/90">
            <p>
              We curate startups building frontier tech — AI, robotics, energy,
              aerospace, and more. Meet founders, discover roles, and work on
              meaningful problems.
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Access to ambitious engineering students</li>
              <li>On-campus presence and brand visibility</li>
              <li>Resume bank and warm intros</li>
            </ul>
            <p className="pt-2 text-sm text-zinc-400">
              Prefer a hosted form? We can enable a Google Form or Formspree
              endpoint on request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
