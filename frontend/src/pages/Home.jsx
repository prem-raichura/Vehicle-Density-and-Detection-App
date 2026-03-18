import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="relative w-full bg-white text-gray-900 overflow-x-hidden">

      {/* 🔥 BACKGROUND LAYER */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-75 h-75 md:w-150 md:h-150 bg-[#3f7aa3]/15 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-62.5 h-62.5 md:w-125 md:h-125 bg-[#7a3a3a]/10 rounded-full blur-3xl bottom-0 -right-10 animate-pulse"></div>
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-4 bg-gray-300 rounded-full opacity-20"
            initial={{ y: "110vh", left: `${Math.random() * 100}%` }}
            animate={{ y: "-10vh" }}
            transition={{ duration: 10, repeat: Infinity, delay: Math.random() * 5 }}
            style={{ position: "absolute" }}
          />
        ))}
      </div>

      {/* ================= HERO SECTION (FIXED HEIGHT TO FIT SCREEN) ================= */}
      {/* h-[calc(100vh-70px)] accounts for the Navbar height. If your Navbar is taller, adjust 70px to 80px */}
      <section className="relative h-[calc(100vh-70px)] min-h-125 w-full flex flex-col items-center justify-between py-8 md:py-12 text-center px-6 max-w-6xl mx-auto overflow-hidden">
        
        {/* Top Content Group */}
        <div className="flex flex-col items-center justify-center grow">
          {/* Tech Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 px-4 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Deep Learning Powered
          </motion.div>

          {/* Headline - Slightly smaller on small desktops to ensure fit */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-gray-900"
          >
            Intelligent Traffic
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#3f7aa3] via-[#6a5a6a] to-[#7a3a3a]">
              Optimization System
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm md:text-base lg:text-lg text-gray-500 max-w-2xl leading-relaxed"
          >
            Revolutionizing urban mobility through <span className="text-gray-900 font-semibold underline decoration-[#3f7aa3]/30">YOLO-driven deep learning</span> to eliminate congestion and enhance smart-city infrastructure.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              to="/detection"
              className="px-8 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 shadow-lg transition-all text-sm md:text-base"
            >
              Launch Real-time Detection
            </Link>

            
          </motion.div>
        </div>

        {/* 🛠 TECH STACK ROW (Moved inside the flex flow so it never cuts off) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 grayscale opacity-40 max-w-4xl pt-6 border-t border-gray-100/50"
        >
          <div className="flex flex-col items-center">
            <span className="text-lg md:text-xl font-bold tracking-tighter">~30 FPS</span>
            <span className="text-[9px] uppercase tracking-widest font-black">Inference Speed</span>
          </div>
          <div className="hidden sm:flex flex-col items-center border-x border-gray-100 px-4">
            <span className="text-lg md:text-xl font-bold tracking-tighter">YOLOv5s</span>
            <span className="text-[9px] uppercase tracking-widest font-black">Architecture</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg md:text-xl font-bold tracking-tighter">PyTorch</span>
            <span className="text-[9px] uppercase tracking-widest font-black">Framework</span>
          </div>
        </motion.div>
      </section>

      {/* ================= HOW IT WORKS (STARTS ON SCROLL) ================= */}
      <section className="py-24 px-6 bg-[#f8f9fa] border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 md:mb-20 text-gray-800"
          >
            How It Works
          </motion.h2>

          <div className="relative">
            <div className="absolute left-5.75 md:left-6.75 top-0 bottom-0 w-1 bg-linear-to-b from-[#3f7aa3] via-[#6a5a6a] to-[#7a3a3a] rounded-full opacity-25"></div>

            <div className="space-y-12">
              {[
                { 
                  title: "Input Acquisition", 
                  desc: "System accepts high-definition snapshots or real-time video streams from cameras.", 
                  color: "border-[#3f7aa3]", 
                  bg: "bg-[#3f7aa3]" 
                },
                { 
                  title: "Model Processing", 
                  desc: "The deep learning engine performs rapid neural network inference using advanced YOLO layers.", 
                  color: "border-[#6a5a6a]", 
                  bg: "bg-[#6a5a6a]" 
                },
                { 
                  title: "Vehicle & Density Detection", 
                  desc: "Simultaneously localizes vehicle types and calculates spatial density to generate traffic reports.", 
                  color: "border-[#7a3a3a]", 
                  bg: "bg-[#7a3a3a]" 
                },
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6 relative z-10"
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full ${step.bg} text-white font-bold shadow-lg shrink-0`}>
                    {i + 1}
                  </div>
                  <div className={`bg-white p-6 md:p-8 rounded-2xl border-l-4 ${step.color} w-full shadow-sm`}>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default Home;