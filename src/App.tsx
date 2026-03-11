import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import SystemsThinking from "./components/sections/SystemsThinking";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import LoadingScreen from "./components/sections/LoadingScreen";
import MatrixRain from "./components/MatrixRain";
import AIGames from "./components/sections/AIGames";
import { ThemeProvider } from "./context/ThemeContext";

import ChatBot from "./components/ChatBot";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative">
        <MatrixRain />
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
          ) : (
            <div key="content" className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary transition-colors duration-500">
              <Navbar />
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <SystemsThinking />
                <AIGames />
                <Contact />
              </main>
              <Footer />
              <ChatBot />
            </div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
