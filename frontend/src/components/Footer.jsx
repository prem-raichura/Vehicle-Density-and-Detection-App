import React from "react";
import { Link, useLocation } from "react-router-dom";
// Ensure the filename matches exactly: DeveloperLink.jsx
import DeveloperLink from "./DeveloperLink"; 

function Footer() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <footer className="w-full bg-[#ececec] border-t border-gray-300 shrink-0">
      <div className={`max-w-7xl mx-auto px-6 md:px-12 ${isLandingPage ? "pt-16 pb-10" : "py-4"}`}>
        
        {isLandingPage && (
          <div className="flex flex-col lg:flex-row gap-10 mb-16 items-center">
            <div className="w-full lg:w-1/3 text-center lg:text-left">
              <Link to="/" className="text-2xl font-black tracking-tighter text-gray-900 flex items-center justify-center lg:justify-start gap-2">
                TrafficEye <span className="text-lg">🚦</span>
              </Link>
              <p className="mt-3 text-gray-500 leading-relaxed text-xs">
                Architecting urban mobility through <span className="text-gray-900 font-bold"> Traffic Density Detection</span>.
              </p>
            </div>

            <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-4xl border border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md shadow-gray-400/10">
              <div className="grow">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3 text-[9px] font-black uppercase tracking-widest">
                  <span className="px-2 py-0.5 bg-blue-50 text-[#3f7aa3] rounded-md">IEEE Published</span>
                  <span className="text-gray-400">Conference Paper</span>
                </div>
                <h4 className="text-gray-900 font-bold leading-tight text-lg mb-2 italic tracking-tight text-center md:text-left">
                  "TrafficEye: Intelligent Traffic Optimization using Deep Learning Approach"
                </h4>
                <p className="text-[11px] text-gray-400 font-medium text-center md:text-left leading-relaxed max-w-lg">
                  Bringing our academic contribution into a functional environment, this system implements the core methodology recognized by the <span className="text-gray-600 font-semibold italic">2nd International IEEE Conference on Artificial Intelligence and Machine Vision.</span>
                </p>
              </div>

              <a 
                href="https://ieeexplore.ieee.org/document/11203522" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#3f7aa3] text-white rounded-xl text-[11px] font-bold shadow-lg shadow-blue-900/10 shrink-0 hover:bg-[#326182] transition-all"
              >
                <span>IEEE Xplore</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <p className="text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase leading-none">
              &copy; {new Date().getFullYear()} TRAFFICEYE SYSTEM
            </p>
          </div>
          
          <div className="h-[1.5px] w-24 bg-linear-to-r from-[#3f7aa3] via-[#6a5a6a] to-[#7a3a3a] rounded-full opacity-20 hidden md:block"></div>
          
          <div className="flex gap-8">
            {/* Component used here instead of plain text */}
            <DeveloperLink />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;