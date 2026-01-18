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
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-futuristic neon-text text-4xl md:text-6xl lg:text-7xl leading-tight"
        >
          Your Startup Journey Starts Here
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-zinc-200/95 mt-6 text-xl md:text-2xl max-w-4xl mx-auto font-medium"
        >
          From first idea to revenue-generating startup — we meet you where you are.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-zinc-300/90 mt-4 text-lg md:text-xl max-w-3xl mx-auto"
        >
          Join a community of driven, ambitious students building the future.
          Network with top startup speakers, get hands-on workshops, find your co-founders, 
          and launch your venture with real support.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <a href="#join" className="button-primary text-lg px-8 py-4">
            Join the Community
          </a>
          <a href="#offerings" className="button-secondary text-lg px-8 py-4">
            See What We Offer
          </a>
        </motion.div>
      </div>
    </header>
  );
};
