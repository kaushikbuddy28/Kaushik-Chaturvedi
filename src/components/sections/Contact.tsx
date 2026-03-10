import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Mail, Linkedin, Globe, Send, Loader2 } from "lucide-react";
import React, { useState } from "react";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // REPLACE 'YOUR_FORMSPREE_ID' with your actual Formspree ID
    // Create one for free at https://formspree.io/
    const FORMSPREE_ID = "xkoqozez";

    if (FORMSPREE_ID === "YOUR_FORMSPREE_ID") {
      setStatus("error");
      setErrorMessage("Please configure your Formspree ID in Contact.tsx to enable the contact form.");
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your internet connection.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div ref={ref}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4"
              >
                Contact
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-5xl font-bold mb-8 text-foreground transition-colors"
              >
                Let's build the <span className="text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary),0.3)]">future</span> together.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-foreground/50 text-lg mb-12 transition-colors"
              >
                Have a project in mind or want to discuss AI engineering?
                I'm always open to collaborating on innovative intelligent systems.
              </motion.p>

              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-6 h-6" />, label: "Email", value: "kaushikchaturvedi3535@gmail.com", href: "mailto:kaushikchaturvedi3535@gmail.com" },
                  { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", value: "Kaushik Chaturvedi", href: "https://www.linkedin.com/in/kaushik-chaturvedi-8aa06b267" },
                  { icon: <Globe className="w-6 h-6" />, label: "Portfolio", value: "kaushikchaturvedi.vercel.app", href: "https://kaushik-chaturvedi.vercel.app/" }
                ].map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center p-6 rounded-2xl bg-background/40 backdrop-blur-xl border border-foreground/10 hover:border-primary/30 transition-all group shadow-2xl shadow-primary/5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg group-hover:shadow-primary/30">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest transition-colors">{item.label}</p>
                      <p className="text-lg font-bold text-foreground transition-colors">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-background/40 backdrop-blur-2xl p-8 lg:p-12 rounded-3xl shadow-2xl shadow-primary/5 border border-foreground/10"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 transition-colors">Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/5 focus:border-primary/50 focus:ring-0 transition-all outline-hidden text-foreground placeholder-foreground/20"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 transition-colors">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/5 focus:border-primary/50 focus:ring-0 transition-all outline-hidden text-foreground placeholder-foreground/20"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 transition-colors">Subject</label>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/5 focus:border-primary/50 focus:ring-0 transition-all outline-hidden text-foreground placeholder-foreground/20"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 transition-colors">Message</label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/5 focus:border-primary/50 focus:ring-0 transition-all outline-hidden resize-none text-foreground placeholder-foreground/20"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {status === "success" && (
                  <p className="text-emerald-500 text-sm font-medium animate-pulse">Message sent successfully!</p>
                )}
                {status === "error" && (
                  <p className="text-rose-500 text-sm font-medium">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:bg-primary-light transition-all flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
