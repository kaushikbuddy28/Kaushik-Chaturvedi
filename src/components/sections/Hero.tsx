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
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '10s' }} />

      <div className="container mx-auto px-6 flex justify-center text-center">
        {/* Content Only */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="space-y-6 flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Available for new opportunities</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
              Kaushik <span className="text-primary">Chaturvedi</span>
            </h1>

            <div className="h-12">
              <p className="text-2xl lg:text-3xl font-medium text-gray-600">
                {displayText}
                <span className="animate-pulse ml-1 inline-block w-1 h-8 bg-primary align-middle" />
              </p>
            </div>

            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              Designing intelligent systems using artificial intelligence, machine learning, and generative AI technologies.
            </p>

            <div className="flex items-center text-gray-500 space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Ahmedabad, Gujarat, India</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all flex items-center group">
                View Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
