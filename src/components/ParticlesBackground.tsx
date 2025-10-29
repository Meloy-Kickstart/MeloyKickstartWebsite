import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export const ParticlesBackground = () => {
  const init = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      className="fixed inset-0 -z-10"
      options={{
        fullScreen: false,
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: ["#9b5cff", "#d40057", "#7c3aed"] },
          links: { enable: true, color: "#7c3aed", opacity: 0.2, width: 1 },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: "out",
          },
          opacity: { value: 0.35 },
          size: { value: { min: 0.5, max: 2.5 } },
          wobble: { enable: true, distance: 5, speed: 5 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" }, resize: true },
          modes: { repulse: { distance: 100, duration: 0.3 } },
        },
        detectRetina: true,
      }}
    />
  );
};
