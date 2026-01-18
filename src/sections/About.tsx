import { FaRocket, FaUsers, FaMicrophone, FaLightbulb, FaBriefcase, FaChartLine, FaNetworkWired, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";

const offerings = [
  {
    icon: <FaMicrophone className="text-violet-neon text-3xl" />,
    title: "Top Startup Speakers",
    desc: "Network with and learn from successful founders and business leaders who've built real companies.",
    highlight: true,
  },
  {
    icon: <FaGraduationCap className="text-violet-neon text-3xl" />,
    title: "Hands-On Workshops",
    desc: "Master everything from idea validation to customer discovery, MVPs, and pitching — guided by industry experts.",
    highlight: true,
  },
  {
    icon: <FaBriefcase className="text-violet-neon text-3xl" />,
    title: "Startup Job Connections",
    desc: "Get connected to startups actively looking for talent. Build your network and find opportunities.",
    highlight: false,
  },
  {
    icon: <FaChartLine className="text-violet-neon text-3xl" />,
    title: "Real Case Studies",
    desc: "Learn from actual startup journeys — the wins, the failures, and everything in between.",
    highlight: false,
  },
  {
    icon: <FaLightbulb className="text-violet-neon text-3xl" />,
    title: "Peer Demo Nights",
    desc: "Showcase what you're building. Get feedback, find collaborators, and inspire others with your work.",
    highlight: true,
  },
  {
    icon: <FaNetworkWired className="text-violet-neon text-3xl" />,
    title: "Residency-Style Cohort",
    desc: "Join an intensive, community-driven program designed to accelerate your startup from concept to launch.",
    highlight: false,
  },
  {
    icon: <FaUsers className="text-violet-neon text-3xl" />,
    title: "Ambitious Community",
    desc: "Surround yourself with like-minded, driven students who are building the future. Find co-founders and lifelong collaborators.",
    highlight: false,
  },
  {
    icon: <FaRocket className="text-violet-neon text-3xl" />,
    title: "Meet You Where You Are",
    desc: "Whether you have a revenue-generating startup or just an interest in entrepreneurship, there's a place for you here.",
    highlight: false,
  },
];

export const About = () => {
  return (
    <section id="offerings" className="section bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="section-title">What You'll Get</h2>
        <p className="text-zinc-200/90 mt-6 text-lg md:text-xl">
          We're not just another club. We're building a complete ecosystem to support 
          your entrepreneurial journey — from your first idea to your first customer.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-12">
        {offerings.map((offering, idx) => (
          <motion.div
            key={offering.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className={`card relative overflow-hidden ${
              offering.highlight ? "border-2 border-violet-neon/30" : ""
            }`}
          >
            {offering.highlight && (
              <div className="absolute top-0 right-0 bg-violet-neon/20 text-violet-neon text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
            )}
            <div className="flex items-start gap-4">
              <div
                className="neon-ring h-14 w-14 rounded-xl flex items-center justify-center bg-surface-800/60 flex-shrink-0"
                aria-hidden
              >
                {offering.icon}
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">{offering.title}</h3>
                <p className="text-zinc-300/90 text-base leading-relaxed">{offering.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="card max-w-3xl mx-auto bg-gradient-to-br from-violet-500/10 to-pink-500/10 border-2 border-violet-neon/20">
          <h3 className="text-2xl font-bold mb-4 neon-text">Ready to Start Building?</h3>
          <p className="text-zinc-300/90 text-lg mb-6">
            Join a community where ambitious ideas become real companies. No matter where you are 
            in your journey, we'll help you take the next step.
          </p>
          <a href="#join" className="button-primary text-lg px-8 py-3 inline-block">
            Join Now
          </a>
        </div>
      </motion.div>
    </section>
  );
};
