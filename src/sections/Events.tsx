import { motion } from "framer-motion";

type Event = {
  date: string;
  title: string;
  desc: string;
  featured?: boolean;
};

const events: Event[] = [
  {
    date: "Sep 04",
    title: "Kickoff!",
    desc: "Welcome, what we do.",
  },
  {
    date: "Sep 18",
    title: "Problems Workshop",
    desc: "Learn how to discover problems worth solving to prevent creating problems for your solution",
  },
  {
    date: "Oct 02",
    title: "Customer Discovery Workshop",
    desc: "Learn the most important business skill: how to find customers, what do they want/need?",
  },
  {
    date: "Oct 16",
    title: "Elevator Pitch Workshop",
    desc: "Rapid ideation jams and practice pitching in front of a group",
  },
  {
    date: "Oct 30",
    title: "MVP Workshop",
    desc: "Prototype fast: product scoping and MVP bootstrapping.",
  },
  {
    date: "Nov 13",
    title: "Peer Demo Night",
    desc: "Showcase what you're building, get feedback, and inspire others.",
    featured: true,
  },
];

const DISCORD =
  import.meta.env.VITE_DISCORD_INVITE || "https://discord.gg/jK5uQRXfSE";

export const Events = () => {
  return (
    <section id="events" className="section">
      <div className="flex items-baseline justify-between gap-6 flex-wrap">
        <div>
          <h2 className="section-title">Meetings & Events</h2>
          <p className="text-zinc-300/90 mt-3 max-w-2xl">
            Bi-weekly workshops, guest speakers, demo nights, and more. Join us every other week to level up your startup game.
          </p>
        </div>
        <div className="flex gap-3 text-sm">
          <a href={DISCORD} target="_blank" rel="noreferrer" className="button-primary">
            Join Discord
          </a>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {events.map((e, idx) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className={`card relative overflow-hidden ${
              e.featured ? "border-2 border-violet-neon/30" : ""
            }`}
          >
            {e.featured && (
              <div className="absolute top-0 right-0 bg-violet-neon/20 text-violet-neon text-xs font-bold px-3 py-1 rounded-bl-lg">
                FEATURED
              </div>
            )}
            <div
              className="absolute -left-6 top-6 w-24 h-24 rounded-full blur-3xl opacity-20"
              style={{
                background:
                  "radial-gradient(circle, #9b5cff55, transparent 60%)",
              }}
            />
            <div className="flex items-start gap-4">
              <div className="neon-ring rounded-xl px-3 py-2 bg-surface-800/60 font-futuristic text-violet-neon/90 flex-shrink-0">
                {e.date}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{e.title}</h3>
                <p className="text-zinc-300/90 mt-1">{e.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
