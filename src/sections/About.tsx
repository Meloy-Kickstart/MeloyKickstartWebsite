import {
  FaRocket,
  FaUsers,
  FaMicrophone,
  FaLightbulb,
  FaTrophy,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Shapes } from "../components/Shapes";
import { Reveal, SplitLines } from "../components/motion";
import type { ReactNode } from "react";

type Offering = {
  icon: ReactNode;
  title: string;
  desc: string;
  highlight?: boolean;
};

const offerings: Offering[] = [
  // Build
  {
    icon: <FaGraduationCap />,
    title: "Workshops",
    desc: "Idea validation, customer discovery, MVPs, pitching.",
    highlight: true,
  },
  {
    icon: <FaLightbulb />,
    title: "Demo Nights",
    desc: "Show what you built. Get feedback.",
    highlight: true,
  },
  // Connect
  {
    icon: <FaMicrophone />,
    title: "Founder Talks",
    desc: "Learn from people who built real companies.",
    highlight: true,
  },
  {
    icon: <FaUsers />,
    title: "Co-founders",
    desc: "Find the people you will build with.",
  },
  // Kickstart
  {
    icon: <FaTrophy />,
    title: "Pitch Competitions",
    desc: "Pitch in front of judges. Win prizes.",
  },
  {
    icon: <FaRocket />,
    title: "Any Stage",
    desc: "Curious or already shipping. You fit here.",
  },
];

export const About = () => {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} id="offerings" className="section isolate">
      <Shapes
        target={ref}
        shapes={[
          { kind: "donut", className: "-right-16 top-8 h-64 w-64 sm:-right-24 sm:h-96 sm:w-96", drift: -120, spin: 90 },
          { kind: "cloud", className: "-left-20 bottom-24 h-32 w-72 sm:h-44 sm:w-[28rem]", drift: 60 },
        ]}
      />
      <div className="wrap">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow">
            What you&rsquo;ll get
          </Reveal>
          <SplitLines
            lines={["Build.", "Connect.", "Kickstart."]}
            className="display text-display-lg mt-4"
          />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:mt-16">
          {offerings.map((o, idx) => (
            <motion.article
              key={o.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              className={`card group flex flex-col ${
                o.highlight ? "border-maroon bg-rose-50" : ""
              }`}
            >
              {o.highlight && (
                <span className="absolute right-4 top-4 rounded-full bg-maroon px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-cream">
                  Popular
                </span>
              )}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-xl text-cream transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
                aria-hidden
              >
                {o.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold leading-snug text-maroon">
                {o.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                {o.desc}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-12 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-maroon p-8 text-cream sm:mt-16 md:flex-row md:items-center lg:p-12"
        >
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rose/30 blur-2xl"
          />
          <div>
            <h3 className="display text-display-md text-cream">
              Ready to build?
            </h3>
            <p className="mt-3 max-w-xl text-cream/80">
              Free to join. No experience needed.
            </p>
          </div>
          <a
            href="#join"
            className="btn bg-cream text-maroon hover:bg-rose-100 hover:-translate-y-0.5 focus-visible:ring-cream focus-visible:ring-offset-maroon"
          >
            Join Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};
