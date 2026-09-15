import { motion, useReducedMotion } from "framer-motion";
import { Blob } from "../components/Blob";
import { SplitLines } from "../components/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export const Hero = () => {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden pt-16 sm:pt-20">
      {/* Wave rises in on load, then drifts slowly forever */}
      <motion.div
        initial={reduce ? false : { y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
        className="pointer-events-none absolute bottom-0 right-0 h-[22%] w-[80%] sm:h-[55%] sm:w-[60%] lg:h-[75%] lg:w-[50%]"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -14, 0], x: [0, 6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <Blob className="h-full w-full" />
        </motion.div>
      </motion.div>

      <div className="wrap">
        <div className="relative grid min-h-[70svh] grid-rows-[auto_1fr] gap-8 py-10 pb-28 sm:py-14 lg:min-h-[78svh] lg:py-16">
          {/* Top row: logo lockup + tagline */}
          <div className="flex flex-wrap items-start justify-between gap-6">
            <motion.div {...fade(0)} className="flex items-center gap-4">
              <motion.img
                src="/Logo.png"
                alt="Meloy Kickstart logo"
                className="h-14 w-14 sm:h-20 sm:w-20"
                decoding="async"
                animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="display text-xl leading-[0.95] tracking-tight sm:text-3xl">
                Meloy
                <br />
                Kickstart
              </span>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, rotate: 4, y: 10 }}
              animate={{ opacity: 1, rotate: -6, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="ml-auto origin-bottom-right"
            >
              <p className="display max-w-[12ch] text-right text-lg italic leading-tight tracking-tight text-maroon-600 sm:text-2xl">
                Students. Startups.
                <br />
                What&rsquo;s Next?
              </p>
            </motion.div>
          </div>

          {/* Headline */}
          <div className="flex flex-col justify-center py-4 sm:py-8">
            <SplitLines
              as="h1"
              inView={false}
              lines={["Your Startup", "Journey", "Starts Here"]}
              className="display text-display-xl"
            />
            <motion.p
              {...fade(0.55)}
              className="lede mt-6 max-w-xl text-ink/80 sm:mt-8"
            >
              Workshops, pitch competitions, founders, and co-founders.
              Texas A&amp;M&rsquo;s engineering entrepreneurship club.
            </motion.p>
            <motion.div
              {...fade(0.7)}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a href="#join" className="btn-primary">
                Join
              </a>
              <a href="#events" className="btn-secondary">
                Events
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
