import { motion } from "framer-motion";
import { FaDiscord, FaCalendarAlt, FaBell } from "react-icons/fa";

const DISCORD =
  import.meta.env.VITE_DISCORD_INVITE || "https://discord.gg/jK5uQRXfSE";

export const Join = () => {

  return (
    <section id="join" className="section bg-gradient-to-b from-violet-500/5 to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Join the Community
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-zinc-200/90 mt-6 text-lg md:text-xl max-w-3xl mx-auto"
        >
          Connect with ambitious builders, get exclusive access to events and workshops, 
          and stay updated on everything happening in the TAMU startup ecosystem.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="card text-center">
            <FaDiscord className="text-violet-neon text-4xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Discord Community</h3>
            <p className="text-zinc-300/90 text-sm">Daily discussions, help, and collaboration</p>
          </div>
          <div className="card text-center">
            <FaBell className="text-violet-neon text-4xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Event Updates</h3>
            <p className="text-zinc-300/90 text-sm">Never miss workshops or speaker events</p>
          </div>
          <div className="card text-center">
            <FaCalendarAlt className="text-violet-neon text-4xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Demo Nights</h3>
            <p className="text-zinc-300/90 text-sm">Showcase your work and get feedback</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10"
        >
          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer"
            className="button-primary text-lg px-10 py-4 inline-flex items-center gap-3"
          >
            <FaDiscord className="text-2xl" />
            Join Discord Now
          </a>
          <p className="text-zinc-400/90 text-sm mt-4">
            Free to join • Active community • Weekly events
          </p>
        </motion.div>
      </div>
    </section>
  );
};
