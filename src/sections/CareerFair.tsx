import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const CareerFair = () => {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [website, setWebsite] = useState("");
  const [hiringTypes, setHiringTypes] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = company.trim().length > 1 && /.+@.+\..+/.test(email);

  const toggleHiringType = (t: string) => {
    setHiringTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!valid) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("startup_contacts").insert({
        company,
        contact_email: email,
        contact_name: contactName || null,
        website: website || null,
        hiring_types: hiringTypes.length ? hiringTypes : null,
        message: message || null,
        source_section: "career_fair",
      });
      if (error) throw error;
      setSubmitted(true);
      setCompany("");
      setEmail("");
      setContactName("");
      setWebsite("");
      setHiringTypes([]);
      setMessage("");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            {submitted ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
                Thanks! Your interest has been recorded. We'll reach out soon.
              </div>
            ) : null}
            {error ? (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-rose-300">
                {error}
              </div>
            ) : null}
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
                Contact Name (optional)
              </label>
              <input
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Jane Founder"
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
                Website (optional)
              </label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourstartup.com"
                className="w-full rounded-xl bg-surface-800/60 border border-white/10 px-4 py-3 outline-none focus:border-violet-neon/60"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300/80 mb-2">
                Hiring Type(s)
              </label>
              <div className="flex flex-wrap gap-3 text-sm text-zinc-300/90">
                {[
                  { key: "Internship", label: "Internship" },
                  { key: "Full-time", label: "Full-time" },
                  { key: "Contract", label: "Contract" },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer select-none ${
                      hiringTypes.includes(opt.key)
                        ? "border-violet-neon/60 bg-violet-500/10"
                        : "border-white/10 bg-surface-800/60"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-violet-500"
                      checked={hiringTypes.includes(opt.key)}
                      onChange={() => toggleHiringType(opt.key)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
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
              <button
                type="submit"
                disabled={!valid || submitting}
                className={`button-primary inline-flex items-center justify-center gap-2 ${
                  !valid || submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Submitting…" : "Partner with Us"}
              </button>
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
          </div>
        </div>
      </div>
    </section>
  );
};
