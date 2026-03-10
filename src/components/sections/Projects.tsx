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
  {
    title: "Movie Semantic Search",
    subtitle: "Vector-Based Content Discovery",
    description: "A Flask-based semantic search engine for movies that leverages vector embeddings for intuitive content discovery.",
    features: [
      "all-MiniLM-L6-v2 SentenceTransformer embeddings",
      "Vector similarity search with Pinecone",
      "Dynamic movie metadata indexing",
      "Real-time semantic query processing",
      "Cloud-native vector database integration",
    ],
    tech: ["Flask", "SentenceTransformer", "Pinecone", "Pandas", "Streamlit"],
    image: "https://picsum.photos/seed/movies/800/600",
  },
  {
    title: "Medicine Assistant",
    subtitle: "AI Powered Medical Intelligence",
    description: "A comprehensive medical assistant built with Gemini API, providing detailed drug information and intelligent dosage guidance.",
    features: [
      "Gemini 2.5 Flash for medical reasoning",
      "Automated use cases & side effects analysis",
      "Dosage and instruction explanation system",
      "Similar medicine comparison engine",
      "Strict medical data privacy compliance",
    ],
    tech: ["Flask", "Google Gemini API", "Python", "Streamlit", "Dotenv"],
    image: "https://picsum.photos/seed/medicine/800/600",
  },
  {
    title: "Data Doctor Pro",
    subtitle: "Automated Data Cleaning Suite",
    description: "A professional data cleansing platform capable of processing millions of records from various sources using custom ML models.",
    features: [
      "Multi-source data ingestion (CSV, SQL, Excel)",
      "Custom models trained on 1Cr+ datasets",
      "Automated cleansing and normalization",
      "Comprehensive data health reporting",
      "Interactive data visualization dashboards",
    ],
    tech: ["FastAPI", "MERN Stack", "Python", "Pandas", "PyTorch"],
    image: "https://picsum.photos/seed/dataclean/800/600",
  },
  {
    title: "HomeSense AI Diagnostics",
    subtitle: "Multimodal Home Health Monitoring",
    description: "Advanced diagnostic system for home maintenance, utilizing image and audio inputs to monitor critical household systems.",
    features: [
      "Multimodal analysis of HVAC and electrical systems",
      "Real-time error detection in wiring/plumbing",
      "AWS Cloud-first architecture (S3, EC2, API Gateway)",
      "Safety compliance monitoring with high recall",
      "Audio-visual diagnostic intelligence",
    ],
    tech: ["PyTorch", "AWS", "YOLO", "REST API", "ONNX", "TensorRT"],
    image: "https://picsum.photos/seed/homesense/800/600",
  },
  {
    title: "Enterprise AI Agents",
    subtitle: "Agentic Workflow Automation",
    description: "A suite of autonomous AI agents designed to automate complex, multi-step business workflows and decision processes.",
    features: [
      "Automated legal contract analysis",
      "LinkedIn candidate scouting intelligence",
      "Quarterly NAV consolidation automation",
      "Investment simulators for portfolio prediction",
      "RoomSense AI for meeting transcription",
    ],
    tech: ["n8n", "OpenAI", "Claude", "Gemini", "DeepSeek", "Bolt"],
    image: "https://picsum.photos/seed/agents/800/600",
  },
  {
    title: "AI Site Builder",
    subtitle: "Cloud-Native Low-Code Platform",
    description: "An open-source AI site builder using OpenRouter and multiple LLMs (Luxe, Bolt) to generate production-ready websites with Stripe integration.",
    features: [
      "Multi-model LLM generation (Luxe, Bolt, GPT-4)",
      "Full-stack code generation (React, Express)",
      "Stripe payment gateway integration",
      "Real-time debugging and hot-reloading",
      "Automated Vercel/Cloud deployment",
    ],
    tech: ["OpenRouter", "React", "Node.js", "Stripe", "Vite", "OpenAI"],
    image: "https://picsum.photos/seed/sitebuilder/800/600",
  },
  {
    title: "Nexus Jarvis",
    subtitle: "Autonomous OS Control System",
    description: "A Jarvis-style desktop assistant capable of controlling local systems, managing office documents, and processing voice commands.",
    features: [
      "Llama-3 & Gemini hybrid reasoning core",
      "Voice command recognition & TTS feedback",
      "Excel and Word document automation",
      "Native desktop control via PyAutoGUI",
      "Multi-modal chat and voice interface",
    ],
    tech: ["Python", "PyAutoGUI", "Gemini API", "Llama 3", "Whisper"],
    image: "https://picsum.photos/seed/jarvis/800/600",
  },
  {
    title: "Neural Style Video",
    subtitle: "Real-time Artistic Processing",
    description: "Fast neural style transfer engine optimized for real-time video stream processing with custom style weight control.",
    features: [
      "Optimized PyTorch inference pipeline",
      "Multi-style weight blending architecture",
      "Low-latency OpenCV video throughput",
      "Artifact-free frame interpolation",
    ],
    tech: ["PyTorch", "OpenCV", "FastAI", "CUDA"],
    image: "https://picsum.photos/seed/videoai/800/600",
  },
  {
    title: "Stock Sentiment Analyzer",
    subtitle: "Financial NLP Pipeline",
    description: "Market intelligence system scraping global social data and cross-referencing with ticker movements for predictive sentiment signals.",
    features: [
      "Scalable web scraping (X/Twitter, Reddit)",
      "GPT-4 sentiment scoring & reasoning",
      "Quant-friendly time-series signals",
      "Real-time market correlation dashboard",
    ],
    tech: ["Python", "OpenAI API", "Pandas", "Playwright"],
    image: "https://picsum.photos/seed/stock/800/600",
  },
  {
    title: "Legal Discovery AI",
    subtitle: "Multi-Modal RAG Platform",
    description: "Enterprise-grade legal document search engine utilizing OCR and multi-hop reasoning to navigate complex case law.",
    features: [
      "OCR-ready PDF processing pipeline",
      "Multi-hop reasoning over vector graphs",
      "Citable source attribution system",
      "High-precision legal fact extraction",
    ],
    tech: ["LangChain", "Faiss", "Tesseract", "OpenAI"],
    image: "https://picsum.photos/seed/legal/800/600",
  },
  {
    title: "Sentiment Support Agent",
    subtitle: "Emotion-Aware CX System",
    description: "Autonomous customer support agent that adapts its persona based on user sentiment analysis during live chat.",
    features: [
      "Real-time emotion detection (BERT)",
      "Sentiment-aware escalation logic",
      "Multi-lingual support (20+ languages)",
      "Automated ticket synthesis & tagging",
    ],
    tech: ["Python", "HuggingFace", "FastAPI", "Redis"],
    image: "https://picsum.photos/seed/support/800/600",
  },
  {
    title: "SignLang Translator",
    subtitle: "Real-time Gesture Recognition",
    description: "Computer vision application translating American Sign Language (ASL) into spoken text in real-time.",
    features: [
      "MediaPipe hand landmark tracking",
      "LSTM-based gesture sequence classification",
      "Voice synthesis (TTS) integration",
      "Mobile-responsive CV throughput",
    ],
    tech: ["Python", "MediaPipe", "Tensorflow", "OpenCV"],
    image: "https://picsum.photos/seed/signlang/800/600",
  },
  {
    title: "Smart Grid Optimizer",
    subtitle: "Load Forecasting Intelligence",
    description: "Industrial energy management suite using time-series transformers to optimize grid load distribution.",
    features: [
      "Transformer-based load forecasting",
      "Reinforcement Learning grid optimization",
      "Real-time sensor telemetry processing",
      "Anomaly detection for grid safety",
    ],
    tech: ["PyTorch", "Scikit-Learn", "Grafana", "Time-Series"],
    image: "https://picsum.photos/seed/grid/800/600",
  },
  {
    title: "Cyber-Security Scan AI",
    subtitle: "Predictive Vulnerability Suite",
    description: "Autonomous red-teaming AI that scans networks for vulnerabilities and generates remediation scripts.",
    features: [
      "Automated CVE lookup & cross-ref",
      "Exploit-simulation RL agent",
      "Interactive vulnerability reporting",
      "Auto-patch generation for known bugs",
    ],
    tech: ["Python", "Nmap API", "Llama 3", "Security"],
    image: "https://picsum.photos/seed/security/800/600",
  },
  {
    title: "AgriMonitor",
    subtitle: "Precision Agriculture Platform",
    description: "Satellite data analysis platform for crop yield prediction and automated pest detection using multi-spectral imagery.",
    features: [
      "Multi-spectral imagery analysis",
      "NDVI-based crop health monitoring",
      "Automated pest identification (YOLOv8)",
      "Historical yield regression models",
    ],
    tech: ["PyTorch", "Gait", "EarthEngine", "YOLOv8"],
    image: "https://picsum.photos/seed/agri/800/600",
  },
  {
    title: "AI Fitness Coach",
    subtitle: "Real-time Pose Analytics",
    description: "Personal training assistant utilizing real-time pose estimation to provide rep counts and form correction advice.",
    features: [
      "Pose estimation via MediaPipe/YOLOv8-pose",
      "Real-time biomechanical analysis",
      "Audio-visual coaching feedback",
      "Performance trend analytics",
    ],
    tech: ["Python", "MediaPipe", "FastAPI", "OpenCV"],
    image: "https://picsum.photos/seed/fitness/800/600",
  },
  {
    title: "Creative Asset Gen",
    subtitle: "Generative Media Suite",
    description: "Multimodal generative tool for creating 3D assets and short video clips from text prompts for game developers.",
    features: [
      "Stable Diffusion & NeRF integration",
      "3D mesh generation from 2D prompts",
      "Automated cinematic camera paths",
      "Enterprise asset pipeline export",
    ],
    tech: ["PyTorch", "Py3D", "Stable Diffusion", "Three.js"],
    image: "https://picsum.photos/seed/creative/800/600",
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
      className="group relative bg-background/40 backdrop-blur-xl rounded-3xl border border-foreground/10 overflow-hidden shadow-2xl shadow-primary/5 hover:border-primary/50 transition-all duration-300"
    >
      <div className="p-8" style={{ transform: "translateZ(50px)" }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h4>
            <p className="text-sm text-primary font-medium mt-1">{project.subtitle}</p>
          </div>
          <Layers className="w-6 h-6 text-foreground/20" />
        </div>

        <p className="text-foreground/70 text-sm mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="space-y-3 mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-foreground/40">Key Features</p>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className="text-xs text-foreground/60 flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-1 shrink-0 shadow-[0_0_5px_rgba(var(--color-primary),0.5)]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-foreground/5 text-[10px] font-bold uppercase tracking-tighter text-foreground/50 rounded border border-foreground/5 group-hover:border-primary/20 transition-colors">
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
    <section id="projects" className="py-24 bg-background transition-colors duration-500">
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
              className="text-4xl lg:text-5xl font-bold text-foreground transition-colors"
            >
              Engineering <span className="text-primary">Intelligent</span> Solutions.
            </motion.h3>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-foreground/50 max-w-md transition-colors"
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
