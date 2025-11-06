import React from "react";
import { motion } from "framer-motion";

/**
 * @param {object} props - Component props.
 * @param {function} props.setShowDetection - Function to switch to the dashboard view.
 */
const WelcomeScreen = ({ setShowDetection }) => {
  return (
    <motion.div
      key="home"
      className="flex flex-col items-center justify-center h-full w-full text-center relative p-8 min-h-[70vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background circle for a modern look */}
      <motion.div
        className="absolute w-80 h-80 sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full blur-3xl opacity-30"
        animate={{ 
          scale: [1, 1.1, 1],
          x: ['-50%', '50%', '-50%'],
          y: ['-50%', '50%', '-50%'],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      ></motion.div>

      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold text-blue-800 z-10 mb-4 drop-shadow-lg"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        Traffic Density & Detection System
      </motion.h1>
      
      <p className="text-lg text-gray-700 mb-10 z-10 max-w-xl">
        AI-powered YOLO-based traffic analysis.
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDetection(true)}
        className="z-10 px-10 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-lg rounded-2xl shadow-xl hover:shadow-2xl transition"
      >
        🚀 Start Detection 🚦
      </motion.button>
    </motion.div>
  );
};

export default WelcomeScreen;