import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Brain, Code2, Cpu, Database, Layout, LineChart, Network, Search } from "lucide-react";

const skillCategories = [
  {
    title: "Artificial Intelligence",
    icon: <Brain className="w-6 h-6" />,
    skills: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Generative AI", "LLM Apps", "YOLOv8", "DeepSeek", "Stable Diffusion", "MediaPipe"],
  },
  {
    title: "Programming & Backend",
    icon: <Code2 className="w-6 h-6" />,
    skills: ["Python", "API Development", "FastAPI", "Flask", "LangChain", "Streamlit", "Node.js", "PyAutoGUI"],
  },
  {
    title: "ML Libraries",
    icon: <Cpu className="w-6 h-6" />,
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "Pandas", "NumPy", "HuggingFace"],
  },
  {
    title: "Vector Search & Data",
    icon: <Search className="w-6 h-6" />,
    skills: ["FAISS", "OpenAI Embeddings", "Vector Databases", "Pinecone", "Redis"],
  },
  {
    title: "Infrastructure",
    icon: <Network className="w-6 h-6" />,
    skills: ["Docker", "AWS", "REST APIs", "n8n", "ONNX", "TensorRT", "Playwright", "Stripe"],
  },
  {
    title: "Visualization & 3D",
    icon: <LineChart className="w-6 h-6" />,
    skills: ["Power BI", "Matplotlib", "Seaborn", "Three.js", "Grafana"],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-24 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4"
          >
            Skills & Tools
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-foreground transition-colors"
          >
            The technical foundation of <span className="text-primary">intelligence</span>.
          </motion.h3>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-3xl bg-background/40 backdrop-blur-xl border border-foreground/10 shadow-2xl shadow-primary/5 hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors shadow-[0_0_15px_rgba(var(--color-primary),0.3)]">
                {category.icon}
              </div>
              <h4 className="text-xl font-bold mb-6 text-foreground transition-colors">{category.title}</h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-foreground/5 text-foreground/70 text-sm font-medium border border-foreground/5 group-hover:border-primary/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
