import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Layers } from "lucide-react";
import React from "react";

const projects = [
  {
    title: "TradeFinder",
    subtitle: "AI Driven Market Pattern Prediction System",
    description: "An intelligent trading analysis platform combining mathematical pattern detection, machine learning prediction models, and AI reasoning to analyze financial market trends.",
    features: [
      "Mathematical Pattern Detection (42 patterns)",
      "AI Assisted Decision Layer for low confidence",
      "Predictive Market Analysis using ML",
      "REST API Architecture with Pydantic validation",
      "Safe retry logic with exponential backoff",
    ],
    tech: ["Python", "FastAPI", "Machine Learning", "OpenAI API", "Pydantic"],
    image: "https://picsum.photos/seed/trading/800/600",
  },
  {
    title: "Sorto AI",
    subtitle: "Fashion Metadata Extraction System",
    description: "Computer vision system designed to extract structured fashion metadata from product images and clothing labels.",
    features: [
      "OpenCV image processing pipeline",
      "Background removal for product images",
      "GPT Vision metadata extraction",
      "OCR wash instruction extraction",
      "Multilingual clothing tag translation",
    ],
    tech: ["Python", "Flask", "OpenAI Vision", "OpenCV", "FAISS", "Pydantic"],
    image: "https://picsum.photos/seed/fashion/800/600",
  },
  {
    title: "Bulls AI",
    subtitle: "Market Intelligence Platform",
    description: "AI driven market intelligence system generating sector analysis, hiring trends, and geographic growth insights.",
    features: [
      "AI powered company analysis",
      "Hiring trend intelligence dashboards",
      "Sector ranking analysis",
      "Real time web data integration",
    ],
    tech: ["Python", "Flask", "OpenAI API", "Web Search", "Pydantic"],
    image: "https://picsum.photos/seed/intelligence/800/600",
  },
  {
    title: "Perfume AI Advisor",
    subtitle: "Vector-Based Recommendation Assistant",
    description: "An AI powered fragrance recommendation assistant providing expert perfume suggestions through natural language and visual similarity.",
    features: [
      "Vector similarity search using FAISS",
      "OpenAI embeddings for perfume matching",
      "GPT Vision for metadata extraction",
      "Conversational AI chatbot",
    ],
    tech: ["Python", "Flask", "OpenAI API", "FAISS", "Vector Embeddings"],
    image: "https://picsum.photos/seed/perfume/800/600",
  },
  {
    title: "Aldera AI",
    subtitle: "Real Estate Price Prediction API",
    description: "Machine learning prediction API for residential property prices using advanced regression models.",
    features: [
      "XGBoost regression model",
      "Feature engineering pipelines",
      "Real time prediction API",
      "Serialized model deployment",
    ],
    tech: ["Python", "Flask", "XGBoost", "Scikit-learn", "Pandas"],
    image: "https://picsum.photos/seed/realestate/800/600",
  },
  {
    title: "LISA",
    subtitle: "AI Skincare Assistant",
    description: "AI assistant providing personalized skincare recommendations using ingredient analysis and user data.",
    features: [
      "Vector search product recommendations",
      "Audio transcription using Whisper",
      "Image based skin analysis",
      "Multimodal AI interaction",
    ],
    tech: ["Python", "Flask", "OpenAI API", "FAISS", "LangChain", "Whisper"],
    image: "https://picsum.photos/seed/skincare/800/600",
  },
];

function ProjectCard({ project, index, key }: { project: typeof projects[0]; index: number; key?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/50 hover:border-primary/50 transition-all duration-300"
    >
      <div className="p-8" style={{ transform: "translateZ(50px)" }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h4>
            <p className="text-sm text-primary font-medium mt-1">{project.subtitle}</p>
          </div>
          <Layers className="w-6 h-6 text-gray-300" />
        </div>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="space-y-3 mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Features</p>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className="text-xs text-gray-500 flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-1 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-gray-50 text-[10px] font-bold uppercase tracking-tighter text-gray-500 rounded border border-gray-100 group-hover:border-primary/20">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <section id="projects" className="py-24 bg-gray-50/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4"
            >
              Projects Showcase
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold"
            >
              Engineering <span className="text-primary">Intelligent</span> Solutions.
            </motion.h3>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-md"
          >
            A collection of production-ready AI systems, from predictive analytics to multimodal generative applications.
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
