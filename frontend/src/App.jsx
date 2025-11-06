import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadZone from "./components/UploadZone";
import MediaPreview from "./components/MediaPreview";
import ResultPanel from "./components/ResultPanel";
import Loader from "./components/Loader";
import WelcomeScreen from "./components/WelcomeScreen";
import Footer from "./components/Footer";

export default function App() {
  const [showDetection, setShowDetection] = useState(false);
  const [result, setResult] = useState(null);
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-to-br from-blue-200 via-white to-cyan-200 overflow-hidden">
      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-grow w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!showDetection ? (
            // ✅ Welcome Screen (Landing Page)
            <WelcomeScreen setShowDetection={setShowDetection} />
          ) : (
            // ✅ Detection Dashboard
            <motion.div
              key="detection"
              className="w-full h-full flex flex-col md:flex-row gap-6 px-4 sm:px-6 md:px-8 py-6 sm:py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* LEFT PANEL */}
              <motion.div
                className="flex-1 bg-white rounded-3xl shadow-2xl p-6 flex flex-col justify-start items-center overflow-y-auto relative"
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-blue-600 mt-12 mb-4">
                  Upload & Detect
                </h2>

                <UploadZone
                  setResult={setResult}
                  setMedia={setMedia}
                  setLoading={setLoading}
                />

                <div className="flex-grow flex flex-col justify-center items-center mt-4">
                  {loading ? <Loader /> : result && <ResultPanel result={result} />}
                </div>

                <motion.button
                  onClick={() => {
                    setShowDetection(false);
                    setResult(null);
                    setMedia(null);
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-6 left-6 bg-white border border-blue-400 text-blue-600 px-4 py-2 rounded-xl shadow hover:bg-blue-50 transition duration-200"
                >
                  ← Back
                </motion.button>
              </motion.div>

              {/* RIGHT PANEL */}
              <motion.div
                className="flex-[1.5] bg-gradient-to-br from-gray-50 to-cyan-50 rounded-3xl shadow-2xl flex justify-center items-center overflow-hidden"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <MediaPreview media={media} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}
