import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <header id="home" className="section pt-28 md:pt-32">
      <div className="relative">
        <div
          className="absolute -top-10 -left-10 h-40 w-40 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #9b5cff55, transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, #d4005755, transparent 60%)",
          }}
        />
      </div>
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-violet-neon/80 font-medium tracking-widest uppercase mb-4"
        >
          Engineering Entrepreneurship @ Texas A&M
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-futuristic neon-text text-4xl md:text-6xl leading-tight"
        >
          Igniting the Next Generation of Engineering Entrepreneurs.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-zinc-300/90 mt-6 text-lg md:text-xl max-w-3xl mx-auto"
        >
          Meloy Kickstart empowers Aggies to build, launch, and grow startups —
          through community, mentorship, and real-world opportunities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a href="#join" className="button-primary">
            Join the Club
          </a>
          <a href="#partner" className="button-secondary">
            Bring Your Startup
          </a>
        </motion.div>
      </div>
    </header>
  );
};
