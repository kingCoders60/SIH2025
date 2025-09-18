import React from "react";
import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

const pulseAnimation = {
  animate: {
    scale: [1, 1.08, 1],
    boxShadow: [
      "0 4px 24px 0 rgba(37,99,235,0.15)",
      "0 8px 32px 0 rgba(37,99,235,0.25)",
      "0 4px 24px 0 rgba(37,99,235,0.15)"
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const FloatingAiIcon = () => (
  <motion.div
    className="fixed bottom-6 right-6 z-50"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  >
    <Link to="/chatbot" aria-label="Open AI Chatbot">
      <motion.button
        whileHover={{ scale: 1.1 }}
        variants={pulseAnimation}
        animate="animate"
        className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg transition-all duration-300 focus:outline-none"
      >
        <BrainCircuit className="w-8 h-8 text-white" />
      </motion.button>
    </Link>
  </motion.div>
);

export default FloatingAiIcon;
