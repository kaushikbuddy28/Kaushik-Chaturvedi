import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-foreground/10 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-foreground transition-colors">
          <div className="text-center md:text-left transition-colors">
            <h4 className="text-xl font-bold mb-2">Kaushik <span className="text-primary drop-shadow-[0_0_5px_rgba(var(--color-primary),0.3)]">Chaturvedi</span></h4>
            <p className="text-sm text-foreground/40 transition-colors">AI / Machine Learning Engineer</p>
          </div>

          <div className="text-center transition-colors">
            <p className="text-sm text-foreground/50 transition-colors mb-2">Built with AI engineering and modern web technologies.</p>
            <p className="text-xs text-foreground/30 transition-colors">© 2026 Kaushik Chaturvedi. All rights reserved.</p>
          </div>

          <div className="flex space-x-6 text-foreground/50">
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
