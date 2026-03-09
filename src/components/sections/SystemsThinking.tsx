import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Database, GitBranch, Server, Share2 } from "lucide-react";

const systems = [
  {
    title: "AI API Architecture",
    description: "Designing modular, scalable backends for AI services with strict validation and error handling.",
    icon: <Server className="w-8 h-8" />,
    steps: ["Request Validation", "Model Inference", "Response Formatting", "Safe Retry Logic"],
  },
  {
    title: "ML Pipelines",
    description: "Automated workflows for data processing, model training, and continuous deployment.",
    icon: <GitBranch className="w-8 h-8" />,
    steps: ["Data Ingestion", "Feature Engineering", "Model Training", "Evaluation & Deployment"],
  },
  {
    title: "Vector Search Architecture",
    description: "High-performance similarity search systems using embeddings and vector databases.",
    icon: <Database className="w-8 h-8" />,
    steps: ["Content Embedding", "Indexing (FAISS)", "Similarity Search", "Context Retrieval"],
  },
];

export default function SystemsThinking() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="systems" className="py-24 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4"
            >
              Systems Thinking
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold mb-8"
            >
              Designing the <span className="text-primary">Blueprint</span> of Intelligence.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mb-12"
            >
              Beyond models, I focus on the architecture that makes AI reliable, scalable, and production-ready. 
              My approach integrates modern backend engineering with cutting-edge machine learning.
            </motion.p>

            <div ref={ref} className="space-y-8">
              {systems.map((sys, idx) => (
                <motion.div
                  key={sys.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start space-x-6 group"
                >
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {sys.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{sys.title}</h4>
                    <p className="text-gray-500 text-sm mb-4">{sys.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {sys.steps.map((step) => (
                        <span key={step} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 px-2 py-1 bg-white/5 rounded">
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            {/* Visual Diagram Representation */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-white/5 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12 border border-white/10 rounded-full border-dashed"
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-32 h-32 bg-primary/20 rounded-full blur-2xl absolute -inset-4"
                  />
                  <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center relative z-10 shadow-2xl shadow-primary/50">
                    <Share2 className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Orbital Nodes */}
              {[0, 90, 180, 270].map((angle, i) => {
                const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.2 }}
                    className="absolute w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
