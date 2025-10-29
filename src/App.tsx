import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { CareerFair } from "./sections/CareerFair";
import { Events } from "./sections/Events";
import { Footer } from "./sections/Footer";
import { ParticlesBackground } from "./components/ParticlesBackground";
import { Join } from "./sections/Join";
import { Navbar } from "./components/Navbar";
import { Chat } from "./sections/Chat";

export default function App() {
  return (
    <div className="bg-surface-900 min-h-screen font-sans">
      <Navbar />
      <div className="fixed inset-0 -z-10 bg-radial-grid animate-slow-pan [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_75%)]" />
      <ParticlesBackground />
      <main>
        <Hero />
        <About />
        <Join />
        <Chat />
        <CareerFair />
        <Events />
      </main>
      <Footer />
    </div>
  );
}
