import { FaRocket, FaUsers, FaCogs } from "react-icons/fa";

const features = [
  {
    icon: <FaCogs className="text-violet-neon text-2xl" />,
    title: "Learn Startup Skills",
    desc: "From idea validation to pitching and MVPs — we cover the essentials engineers need to build companies.",
  },
  {
    icon: <FaUsers className="text-violet-neon text-2xl" />,
    title: "Find Co-Founders",
    desc: "Meet other builders across disciplines. Form teams and collaborate on ambitious ideas.",
  },
  {
    icon: <FaRocket className="text-violet-neon text-2xl" />,
    title: "Build Real Ventures",
    desc: "Turn projects into products. Access mentorship, resources, and pathways to launch.",
  },
];

export const About = () => {
  return (
    <section id="about" className="section">
      <h2 className="section-title">What We Do.</h2>
      <p className="text-zinc-300/90 mt-4 max-w-3xl">
        We’re a club for engineers passionate about entrepreneurship. Every
        other week, we explore startup concepts, meet founders, and collaborate
        on projects that can become real companies.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {features.map((f) => (
          <div key={f.title} className="card">
            <div className="flex items-center gap-3">
              <div
                className="neon-ring h-10 w-10 rounded-lg flex items-center justify-center bg-surface-800/60"
                aria-hidden
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
            </div>
            <p className="text-zinc-300/90 mt-3">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
