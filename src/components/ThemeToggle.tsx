import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all flex items-center space-x-2 group"
            aria-label="Toggle Theme"
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                {theme === "light" ? (
                    <Sun className="w-5 h-5 text-primary group-hover:rotate-45 transition-transform" />
                ) : (
                    <Terminal className="w-5 h-5 text-primary" />
                )}
            </div>
            <span className="text-xs font-medium text-foreground">
                {theme === "light" ? "Normal" : "Matrix"}
            </span>
        </motion.button>
    );
}
