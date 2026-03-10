import { motion } from "motion/react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const roles = [
  "Artificial Intelligent Engineer",
  "Generative AI Engineer",
  "Machine Learning Engineer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background/50 transition-colors duration-500">
      {/* Background Elements - Theme Aware */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent transition-all duration-500" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl transition-all duration-500" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-bounce transition-all duration-500" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-bounce transition-all duration-500" style={{ animationDuration: '10s' }} />

      <div className="container mx-auto px-6 flex justify-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="space-y-6 flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-md shadow-[0_0_15px_rgba(var(--color-primary),0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Available for new opportunities</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground transition-colors">
              Kaushik <span className="text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary),0.3)]">Chaturvedi</span>
            </h1>

            <div className="h-12">
              <p className="text-2xl lg:text-3xl font-medium text-foreground/70 transition-colors">
                {displayText}
                <span className="animate-pulse ml-1 inline-block w-1 h-8 bg-primary align-middle" />
              </p>
            </div>

            <p className="text-lg text-foreground/50 max-w-xl leading-relaxed transition-colors">
              Designing intelligent systems using artificial intelligence, machine learning, and generative AI technologies.
            </p>

            <div className="flex items-center text-foreground/50 space-x-2 transition-colors">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Ahmedabad, Gujarat, India</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href="#projects"
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center group cursor-pointer"
              >
                View Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://drive.google.com/drive/folders/1J-FaqJBct2beFXH_T9WgbzDaOPcffNIx?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-background/50 text-foreground border-2 border-primary/20 rounded-xl font-semibold backdrop-blur-md shadow-2xl shadow-primary/5 hover:bg-primary/10 hover:border-primary transition-all flex items-center group"
              >
                Download Resume
                <Download className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
