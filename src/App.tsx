import { Hero } from "./sections/Hero";
import { CareerFair } from "./sections/CareerFair";
import { Events } from "./sections/Events";
import { Footer } from "./sections/Footer";
import { Join } from "./sections/Join";
import { Instagram } from "./sections/Instagram";
import { Photos } from "./sections/Photos";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-sans text-ink">
      <Navbar />
      <main>
        <Hero />
        <Instagram />
        <Photos />
        {/* <Join /> */}
      </main>
      <Footer />
    </div>
  );
}
