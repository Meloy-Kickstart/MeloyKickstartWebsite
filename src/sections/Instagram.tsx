import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { Reveal, SplitLines } from "../components/motion";
import { INSTAGRAM_HANDLE, instagramPosts } from "../data/instagram";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const EMBED_JS = "https://www.instagram.com/embed.js";

export const Instagram = () => {
  useEffect(() => {
    if (instagramPosts.length === 0) return;
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_JS}"]`);
    if (existing) {
      window.instgrm?.Embeds.process();
      return;
    }
    const s = document.createElement("script");
    s.src = EMBED_JS;
    s.async = true;
    s.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(s);
  }, []);

  if (instagramPosts.length === 0) return null;

  return (
    <section id="instagram" className="section bg-rose-50">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal as="p" className="eyebrow">
              On Instagram
            </Reveal>
            <SplitLines
              lines={["Real people.", "Real events."]}
              className="display text-display-lg mt-4"
            />
          </div>
          {INSTAGRAM_HANDLE && (
            <Reveal delay={0.2} className="self-start md:self-auto">
              <a
                href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <FaInstagram className="text-lg" />@{INSTAGRAM_HANDLE}
              </a>
            </Reveal>
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instagramPosts.map((url, idx) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-2xl border-2 border-maroon/15 bg-white"
            >
              <blockquote
                className="instagram-media !m-0 !w-full !min-w-0 !max-w-none !border-0 !shadow-none"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
              >
                <a href={url} target="_blank" rel="noreferrer" className="block p-6 text-sm text-maroon">
                  View this post on Instagram
                </a>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
