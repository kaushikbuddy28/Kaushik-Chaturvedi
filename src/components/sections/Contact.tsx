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
    <section id="contact" className="py-24 bg-white">
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
                className="text-4xl lg:text-5xl font-bold mb-8"
              >
                Let's build the <span className="text-primary">future</span> together.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-lg mb-12"
              >
                Have a project in mind or want to discuss AI engineering?
                I'm always open to collaborating on innovative intelligent systems.
              </motion.p>

              <div className="space-y-6">
                <motion.a
                  href="mailto:kaushikchaturvedi3535@gmail.com"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="flex items-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="text-lg font-bold text-foreground">kaushikchaturvedi3535@gmail.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/kaushik-chaturvedi-8aa06b267"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="flex items-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">LinkedIn</p>
                    <p className="text-lg font-bold text-foreground">Kaushik Chaturvedi</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://kaushikchaturvediportfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="flex items-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Portfolio</p>
                    <p className="text-lg font-bold text-foreground">kaushikchaturvedi.vercel.app</p>
                  </div>
                </motion.a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary/50 focus:ring-0 transition-all outline-hidden"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary/50 focus:ring-0 transition-all outline-hidden"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary/50 focus:ring-0 transition-all outline-hidden"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary/50 focus:ring-0 transition-all outline-hidden resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {status === "success" && (
                  <p className="text-emerald-600 text-sm font-medium">Message sent successfully.</p>
                )}
                {status === "error" && (
                  <p className="text-rose-600 text-sm font-medium">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
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
