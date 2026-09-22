import { motion } from "framer-motion";
import { SplitLines } from "../components/motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const DISCORD = import.meta.env.VITE_DISCORD_INVITE || "https://discord.gg/jK5uQRXfSE";
const LUMA = "https://luma.com/user/usr-GjilPA3HrL19yKV";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export const Hero = () => {
  return (
    <section id="home" className="hero-surface pt-16 sm:pt-20">
      <div className="wrap">
        <div className="py-14 sm:py-16 lg:py-20">
          <div className="grid gap-10 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <div>
              <motion.p {...fade(0.1)} className="eyebrow">
                Engineering entrepreneurship at Texas A&amp;M
              </motion.p>
              <SplitLines
                as="h1"
                inView={false}
                lines={["Ready to turn your technical skills into a startup?"]}
                className="display mt-4 max-w-[14ch] text-[clamp(3rem,4.4vw,4.5rem)] leading-[0.92]"
              />
              <motion.p
                {...fade(0.55)}
                className="lede mt-6 max-w-xl text-ink/80 sm:mt-8"
              >
                Meloy Kickstart connects engineers with the people, resources, and practical skills
                to build scalable businesses.
              </motion.p>
            </div>

            <div>
              <motion.aside
                {...fade(0.35)}
                className="relative border-2 border-maroon bg-rose-50 p-7 sm:p-8"
                aria-label="Ways to get involved"
              >
                <p className="text-2xl font-extrabold tracking-tight text-maroon">
                  200+ <span className="text-sm font-medium uppercase tracking-wider">members and counting</span>
                </p>
                <p className="mt-5 text-sm leading-relaxed text-ink/75">
                  Whether you&rsquo;re actively building a product or learning how the startup ecosystem
                  works, connect with the community and register for the semester&rsquo;s events.
                </p>
                <div className="mt-7 grid gap-3">
                  <a href={DISCORD} target="_blank" rel="noreferrer" className="group rounded-xl border-2 border-maroon bg-cream p-4 transition hover:-translate-y-0.5 hover:shadow-lift">
                    <span className="block text-sm font-bold text-maroon">Join Discord</span>
                    <span className="mt-1 block text-sm text-ink/70">Community, reminders, and resources.</span>
                  </a>
                  <a href={LUMA} target="_blank" rel="noreferrer" className="group rounded-xl bg-maroon p-4 text-cream transition hover:-translate-y-0.5 hover:shadow-lift">
                    <span className="block text-sm font-bold">Join Luma</span>
                    <span className="mt-1 block text-sm text-cream/75">Event details and registration.</span>
                  </a>
                </div>
              </motion.aside>
            </div>

            <motion.div {...fade(0)} className="border-y border-maroon/20 py-4 lg:col-span-2">
              <ul className="grid gap-x-6 gap-y-1 text-sm font-semibold text-maroon sm:grid-cols-2 lg:grid-cols-4">
                <li>Startup workshops</li>
                <li>Campus resources</li>
                <li>Co-founders</li>
                <li>Founder speakers</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
