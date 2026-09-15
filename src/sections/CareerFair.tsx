import { useState } from "react";
import { motion } from "framer-motion";
import { FaBullhorn, FaHandshake, FaUsers } from "react-icons/fa";
import { Reveal, SplitLines } from "../components/motion";

const PERKS = [
  { icon: <FaUsers />, title: "Engineers", desc: "Students who build" },
  { icon: <FaBullhorn />, title: "Visibility", desc: "Your name on campus" },
  { icon: <FaHandshake />, title: "Intros", desc: "Warm, not cold" },
];

const PARTNER_TYPES = [
  "Speak at a meeting",
  "Hire students",
  "Sponsor",
  "Spring career fair",
];

// Google Apps Script web app that appends a row to the Partner sheet.
// See google-apps-script/Code.gs for the endpoint and setup steps.
// Read at submit time so tests can stub the env after the module loads.
const webhookUrl = () => import.meta.env.VITE_SHEETS_WEBHOOK_URL;

export const CareerFair = () => {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [website, setWebsite] = useState("");
  const [partnerTypes, setPartnerTypes] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = company.trim().length > 1 && /.+@.+\..+/.test(email);

  const togglePartnerType = (t: string) => {
    setPartnerTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!valid) return;

    const webhook = webhookUrl();
    if (!webhook) {
      setError("Form is not connected yet. Email us at meloykickstart@gmail.com.");
      return;
    }

    setSubmitting(true);
    try {
      // No Content-Type header: a text/plain body skips the CORS preflight,
      // which Apps Script web apps do not answer.
      const res = await fetch(webhook, {
        method: "POST",
        body: JSON.stringify({
          company,
          contact_email: email,
          contact_name: contactName,
          website,
          partner_types: partnerTypes,
          message,
          source_section: "partner",
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Request failed");
      setSubmitted(true);
      setCompany("");
      setEmail("");
      setContactName("");
      setWebsite("");
      setPartnerTypes([]);
      setMessage("");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="partner" className="section bg-rose-50">
      <div className="wrap">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow">
            For startups and companies
          </Reveal>
          <SplitLines
            lines={["Partner", "with us"]}
            className="display text-display-lg mt-4"
          />
          <Reveal as="p" delay={0.2} className="lede mt-6">
            Speak at a meeting, hire students, sponsor us, or join our spring
            career fair.
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Reveal>
          <form
            className="card space-y-5 bg-cream hover:border-maroon/15 hover:shadow-none"
            onSubmit={onSubmit}
            noValidate
          >
            <div>
              <h3 className="display text-display-md">Get in touch</h3>
              <p className="mt-2 text-sm text-ink/75">
                Tell us who you are and how you want to work with us.
              </p>
            </div>

            {submitted && (
              <p
                role="status"
                className="rounded-xl border-2 border-maroon bg-rose-100 p-4 text-sm font-medium text-maroon"
              >
                Thanks! Your interest is recorded. We&rsquo;ll reach out soon.
              </p>
            )}
            {error && (
              <p
                role="alert"
                className="rounded-xl border-2 border-red-700 bg-red-50 p-3 text-sm text-red-800"
              >
                {error}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-company" className="label">
                  Company name
                </label>
                <input
                  id="cf-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., QuantumForge Labs"
                  autoComplete="organization"
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="cf-name" className="label">
                  Contact name <span className="opacity-60">(optional)</span>
                </label>
                <input
                  id="cf-name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Jane Founder"
                  autoComplete="name"
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="cf-email" className="label">
                  Contact email
                </label>
                <input
                  id="cf-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@startup.com"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="cf-website" className="label">
                  Website <span className="opacity-60">(optional)</span>
                </label>
                <input
                  id="cf-website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourstartup.com"
                  type="url"
                  inputMode="url"
                  className="field"
                />
              </div>
            </div>

            <fieldset>
              <legend className="label">I want to</legend>
              <div className="flex flex-wrap gap-2">
                {PARTNER_TYPES.map((t) => {
                  const on = partnerTypes.includes(t);
                  return (
                    <label
                      key={t}
                      className={`cursor-pointer select-none rounded-full border-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        on
                          ? "border-maroon bg-maroon text-cream"
                          : "border-maroon/30 text-maroon hover:border-maroon"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={on}
                        onChange={() => togglePartnerType(t)}
                      />
                      {t}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="cf-message" className="label">
                Message
              </label>
              <textarea
                id="cf-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Anything else we should know?"
                className="field resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={!valid || submitting}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto"
            >
              {submitting ? "Sending…" : "Send"}
            </button>
          </form>
          </Reveal>

          <ul className="grid gap-4 self-start sm:grid-cols-3 lg:sticky lg:top-28 lg:grid-cols-1">
            {PERKS.map((p, idx) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 6 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="card flex items-start gap-4 bg-cream"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-maroon text-lg text-cream"
                  aria-hidden
                >
                  {p.icon}
                </span>
                <div>
                  <h3 className="font-bold text-maroon">{p.title}</h3>
                  <p className="mt-1 text-sm text-ink/75">{p.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
