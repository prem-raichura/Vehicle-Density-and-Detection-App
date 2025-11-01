import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadZone from "./components/UploadZone";
import MediaPreview from "./components/MediaPreview";
import ResultPanel from "./components/ResultPanel";
import Loader from "./components/Loader";

export default function App() {
  const [showDetection, setShowDetection] = useState(false);
  const [result, setResult] = useState(null);
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-200 via-white to-cyan-200 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!showDetection ? (
          <motion.div
            key="home"
            className="flex flex-col items-center justify-center h-full w-full text-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Animated background circle */}
            <motion.div
              className="absolute w-[600px] h-[600px] bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full blur-3xl opacity-30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            ></motion.div>

            <motion.h1
              className="text-6xl font-extrabold text-blue-800 z-10 mb-4"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Vehicle Density & Detection
            </motion.h1>
            <p className="text-lg text-gray-700 mb-10 z-10">
              AI-powered YOLO-based traffic analysis
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetection(true)}
              className="z-10 px-10 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-lg rounded-2xl shadow-xl hover:shadow-2xl transition"
            >
              Start Detection 🚦
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="detection"
            className="w-full h-full flex flex-col md:flex-row gap-6 px-8 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* LEFT PANEL */}
            <motion.div
              className="flex-1 bg-white rounded-3xl shadow-2xl p-6 flex flex-col justify-start items-center overflow-hidden relative md:overflow-hidden overflow-y-auto"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h2 className="text-2xl font-semibold text-blue-600 mt-12 mb-4">
                Upload & Detect
              </h2>

              <UploadZone
                setResult={setResult}
                setMedia={setMedia}
                setLoading={setLoading}
              />

              <div className="flex-grow flex flex-col justify-center items-center">
                {loading ? <Loader /> : result && <ResultPanel result={result} />}
              </div>

              <motion.button
                onClick={() => {
                  setShowDetection(false);
                  setResult(null);
                  setMedia(null);
                }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-6 left-6 bg-white border border-blue-400 text-blue-600 px-4 py-2 rounded-xl shadow hover:bg-blue-50"
              >
                ← Back
              </motion.button>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div
              className="flex-[1.5] bg-gradient-to-br from-gray-50 to-cyan-50 rounded-3xl shadow-2xl flex justify-center items-center overflow-hidden"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <MediaPreview media={media} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
