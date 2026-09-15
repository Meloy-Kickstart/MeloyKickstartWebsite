import { motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa";
import { Reveal, SplitLines } from "../components/motion";

const DISCORD =
  import.meta.env.VITE_DISCORD_INVITE || "https://discord.gg/jK5uQRXfSE";

export const Join = () => {
  return (
    <section id="join" className="section bg-rose-50">
      <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Reveal as="p" className="eyebrow">
            No membership
          </Reveal>
          <SplitLines
            lines={["Free.", "Just show up."]}
            className="display text-display-lg mt-4"
          />
          <Reveal as="p" delay={0.2} className="lede mt-6 max-w-lg">
            No fees, no sign-up, no application. Any major. Come to a
            meeting.
          </Reveal>
        </div>

        <motion.a
          href={DISCORD}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ y: -6 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="group relative overflow-hidden rounded-2xl bg-maroon p-8 text-cream shadow-lift lg:p-12"
        >
          <FaDiscord
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -right-8 text-[11rem] text-cream/10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"
          />
          <p className="eyebrow text-cream/60">Stay updated</p>
          <h3 className="display mt-4 text-display-md text-cream">
            Join the Discord
          </h3>
          <p className="mt-4 max-w-sm text-cream/80">
            Every event, workshop link, and reminder goes there first.
          </p>
          <span className="btn mt-8 bg-cream text-maroon group-hover:bg-rose-100">
            <FaDiscord className="text-lg" />
            Open invite
          </span>
        </motion.a>
      </div>
    </section>
  );
};
