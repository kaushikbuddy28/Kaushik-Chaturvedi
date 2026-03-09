import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-foreground mb-2">Kaushik <span className="text-primary">Chaturvedi</span></h4>
            <p className="text-sm text-gray-400">AI / Machine Learning Engineer</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Built with AI engineering and modern web technologies.</p>
            <p className="text-xs text-gray-400">© 2026 Kaushik Chaturvedi. All rights reserved.</p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
