type Event = {
  date: string;
  title: string;
  desc: string;
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
    title: "TBD",
    desc: "TBD",
  },
];

export const Events = () => {
  return (
    <section id="events" className="section">
      <div className="flex items-baseline justify-between gap-6 flex-wrap">
        <h2 className="section-title">Meetings & Events.</h2>
        <div className="flex gap-3 text-sm">
          <a href="#join" className="button-secondary">
            Get Notified
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Join Discord
          </a>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {events.map((e) => (
          <div key={e.title} className="card relative overflow-hidden">
            <div
              className="absolute -left-6 top-6 w-24 h-24 rounded-full blur-3xl opacity-20"
              style={{
                background:
                  "radial-gradient(circle, #9b5cff55, transparent 60%)",
              }}
            />
            <div className="flex items-start gap-4">
              <div className="neon-ring rounded-xl px-3 py-2 bg-surface-800/60 font-futuristic text-violet-neon/90">
                {e.date}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{e.title}</h3>
                <p className="text-zinc-300/90 mt-1">{e.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
