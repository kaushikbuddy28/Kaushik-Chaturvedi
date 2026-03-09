import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    company: "Equitysoft Technologies Pvt Ltd",
    role: "Artificial Intelligence and Machine Learning Engineer",
    period: "December 2025 – Present",
    responsibilities: [
      "Building Generative AI applications",
      "Developing machine learning prediction systems",
      "Designing AI powered backend APIs",
      "Working with computer vision and NLP pipelines",
      "Deploying scalable AI microservices",
    ],
    tech: ["Python", "FastAPI", "TensorFlow", "PyTorch", "Docker", "Kubernetes"],
  },
  {
    company: "NexGen Innovation",
    role: "Artificial Intelligence and Machine Learning Engineer",
    period: "October 2024 – December 2025",
    responsibilities: [
      "Machine learning model development",
      "Data analysis and visualization",
      "Predictive analytics systems",
      "AI prototype development",
    ],
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
  },
  {
    company: "IBM AI and Data Analytics Program",
    role: "ai-ml intern",
    period: "2024",
    responsibilities: [
      "Worked on real world analytics projects",
      "Generated data driven insights for business cases",
      "Implemented statistical models for trend analysis",
    ],
    tech: ["Python", "SQL", "Power BI"],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4"
          >
            Experience
          </motion.h2>
          <h3 className="text-4xl lg:text-5xl font-bold">Professional <span className="text-primary">Timeline</span>.</h3>
        </div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company + idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-lg -translate-x-1/2 z-10 hidden md:block" />

                <div className="w-full md:w-1/2 px-0 md:px-12">
                  <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100/50 hover:border-primary/20 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>
                    </div>

                    <h4 className="text-xl font-bold mb-1">{exp.role}</h4>
                    <p className="text-primary font-medium mb-6">{exp.company}</p>

                    <ul className="space-y-3 mb-8">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2 py-1 bg-gray-50 text-[10px] font-bold uppercase tracking-tighter text-gray-400 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
