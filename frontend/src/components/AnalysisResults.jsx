import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnalysisResults({ results, isProcessing, densityConfig }) {
  // Find max count to scale the bars correctly
  const maxCount = results?.classes 
    ? Math.max(...results.classes.map(c => c.count), 1) 
    : 1;

  return (
    <div className="w-full lg:w-[35%] flex flex-col gap-4 h-auto lg:h-full">
      <AnimatePresence mode="wait">
        {results && !isProcessing ? (
          <motion.div 
            key="results" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="flex flex-col gap-4 h-full justify-between"
          >
            {/* TOP STATS CARDS */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              <div className="bg-white p-4 rounded-4xl border border-gray-100 shadow-sm flex flex-col justify-center">
                <p className="text-[9px] uppercase font-black text-gray-400 mb-1">Total Count</p>
                <p className="text-3xl font-black text-[#3f7aa3] tracking-tighter leading-none">
                  {results.totalVehicles ?? 0}
                </p>
              </div>

              <div className="bg-white p-4 rounded-4xl border border-gray-100 shadow-sm flex flex-col justify-center">
                <p className="text-[9px] uppercase font-black text-gray-400 mb-1">Inference</p>
                <p className="text-3xl font-black text-[#6a5a6a] tracking-tighter leading-none">
                  {
                    results.fps
                      ? Number(results.fps) < 1
                        ? Number(results.fps).toFixed(2)
                        : Number(results.fps).toFixed(1)
                      : "0.0"
                  }
                  <span className="text-[10px] ml-1 uppercase text-gray-400 font-bold">fps</span>
                </p>
              </div>
            </div>

            {/* BAR CHART SECTION */}
            {/* Mobile: h-64 (Fixed height so bars show up) | Laptop: lg:grow (Back to original flexible look) */}
            <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm h-64 lg:h-auto lg:grow flex flex-col overflow-hidden">
              <h3 className="text-[9px] uppercase tracking-widest font-black text-gray-400 mb-6 text-center shrink-0">Class Distribution</h3>
              
              <div className="flex items-end justify-around grow gap-2 px-2 pb-2 h-full">
                {results.classes?.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 w-full h-full justify-end">
                    {/* Count above bar */}
                    <div className="text-[10px] font-black text-gray-400 leading-none shrink-0">{item.count}</div>
                    
                    {/* The Bar Container */}
                    <div className="relative w-full flex justify-center items-end grow">
                      <motion.div 
                        initial={{ height: 0 }} 
                        animate={{ height: `${(item.count / maxCount) * 100}%` }}
                        style={{ backgroundColor: item.count > 0 ? item.color : '#f3f4f6' }}
                        className="w-full max-w-3.5 sm:max-w-10 rounded-t-xl shadow-lg relative group min-h-0.5"
                      >
                         <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl" />
                      </motion.div>
                    </div>

                    {/* Label below bar */}
                    <div className="text-[8px] font-black text-gray-500 uppercase tracking-tighter text-center leading-none mt-1 shrink-0">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TRAFFIC DENSITY FOOTER */}
            <div className={`p-6 rounded-4xl text-white shadow-xl transition-all duration-700 h-30 lg:h-[25%] shrink-0 flex flex-col justify-center
              ${densityConfig[results.density]?.bg || 'bg-gray-400'} ${densityConfig[results.density]?.shadow || ''}`}>
              <h3 className="text-[9px] uppercase tracking-[0.3em] font-black opacity-70 mb-1">Traffic Density</h3>
              <p className="text-4xl lg:text-5xl font-black tracking-tighter italic uppercase leading-none">{results.density}</p>
            </div>
          </motion.div>
        ) : (
          /* LOADING / WAITING STATE */
          <motion.div key="waiting" className="flex flex-col gap-4 h-full justify-between opacity-60">
             <div className="grid grid-cols-2 gap-4 shrink-0">
                <div className="h-24 bg-gray-100 rounded-4xl animate-pulse"></div>
                <div className="h-24 bg-gray-100 rounded-4xl animate-pulse"></div>
             </div>
             <div className="grow h-64 lg:h-auto bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200 flex items-center justify-center p-10 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Awaiting Analysis</p>
             </div>
             <div className="h-30 lg:h-[25%] bg-gray-200 rounded-4xl"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AnalysisResults;