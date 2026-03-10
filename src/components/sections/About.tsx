import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

const expertise = [
  "Machine learning system design",
  "Generative AI integration",
  "Computer Vision pipelines",
  "Vector search and embeddings",
  "AI API architecture",
  "Backend engineering for AI systems",
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="py-24 bg-background/50 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4">About Me</h2>
            <h3 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight text-foreground transition-colors">
              Bridging the gap between <span className="text-primary">AI models</span> and <span className="text-primary">production systems</span>.
            </h3>
            <div className="space-y-6 text-lg text-foreground/70 leading-relaxed transition-colors">
              <p>
                Kaushik Chaturvedi is an AI and Machine Learning Engineer specializing in the design and development of
                intelligent systems powered by machine learning, generative AI, and computer vision.
              </p>
              <p>
                He has experience building production-ready AI APIs, machine learning prediction systems, vector search
                applications, and multimodal AI assistants.
              </p>
              <p>
                His work focuses on combining machine learning models with real-world product systems using modern
                backend engineering practices.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-background/40 backdrop-blur-xl p-8 lg:p-12 rounded-3xl shadow-2xl shadow-primary/5 border border-foreground/10 transition-all"
          >
            <h4 className="text-2xl font-bold mb-8 text-foreground transition-colors">Areas of Expertise</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {expertise.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(var(--color-primary),0.5)]" />
                  <span className="text-foreground/80 font-medium transition-colors group-hover:text-primary">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-foreground/10 transition-colors">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-bold text-primary">2+</p>
                  <p className="text-sm text-foreground/50 uppercase tracking-wider transition-colors">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">20+</p>
                  <p className="text-sm text-foreground/50 uppercase tracking-wider transition-colors">Projects Completed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
