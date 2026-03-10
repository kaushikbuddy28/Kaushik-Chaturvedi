import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const messages = [
  "Initializing AI Systems",
  "Loading Machine Learning Modules",
  "Connecting Intelligence Layers",
  "Launching Portfolio",
];

export default function LoadingScreen({ onComplete, key }: { onComplete: () => void; key?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < messages.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-colors duration-500"
    >
      <div className="relative w-32 h-32 mb-8">
        {/* Neural Network Node Animation */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.circle
            cx="50"
            cy="50"
            r="4"
            fill="var(--color-primary)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          />
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const x = 50 + 30 * Math.cos((angle * Math.PI) / 180);
            const y = 50 + 30 * Math.sin((angle * Math.PI) / 180);
            return (
              <g key={i}>
                <motion.line
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke="var(--color-primary)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  style={{ opacity: 0.5 }}
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill="var(--color-primary)"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-foreground font-mono text-sm tracking-widest uppercase transition-colors"
          >
            {messages[index] || messages[messages.length - 1]}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-12 w-48 h-1 bg-foreground/10 rounded-full overflow-hidden transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
