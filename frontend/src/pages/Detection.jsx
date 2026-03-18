import React, { useState } from "react";
import MediaFeed from "../components/MediaFeed";
import AnalysisResults from "../components/AnalysisResults";

const DENSITY_CONFIG = {
  High: { bg: "bg-[#7a3a3a]", shadow: "shadow-[#7a3a3a]/20", color: "#7a3a3a" },
  Medium: { bg: "bg-[#d97706]", shadow: "shadow-[#d97706]/20", color: "#d97706" },
  Low: { bg: "bg-[#3f7aa3]", shadow: "shadow-[#3f7aa3]/20", color: "#3f7aa3" }
};

function Detection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReadyToDetect, setIsReadyToDetect] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsReadyToDetect(true);
      setResults(null);
    }
  };

  const resetAll = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsProcessing(false);
    setIsReadyToDetect(false);
    setResults(null);
  };

  return (
    <div className="flex-1 w-full bg-[#fcfcfc] text-gray-900 flex flex-col p-4 md:px-12 md:pb-4 h-auto lg:h-full overflow-y-auto lg:overflow-hidden">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col lg:justify-between gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0 pt-2">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#3f7aa3] leading-none uppercase">
            <span className="text-gray-900">Live</span> Detection
          </h1>
          <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-full border border-gray-100 shadow-sm shrink-0">
             <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-yellow-400 animate-pulse' : results ? 'bg-green-500' : 'bg-gray-200'}`}></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
               System: {isProcessing ? "Processing" : results ? "Analysis Ready" : "Idle"}
             </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-stretch justify-center grow lg:min-h-0 mb-4 h-auto lg:h-full">
          <MediaFeed 
            previewUrl={previewUrl}
            selectedFile={selectedFile}
            isReadyToDetect={isReadyToDetect}
            isProcessing={isProcessing}
            onFileUpload={handleFileUpload}
            onReset={resetAll}
            setResult={setResults}
            setMedia={setPreviewUrl}
            setLoading={setIsProcessing}
            setIsReadyToDetect={setIsReadyToDetect}
          />
          <AnalysisResults 
            results={results}
            isProcessing={isProcessing}
            densityConfig={DENSITY_CONFIG}
          />
        </div>
      </div>
    </div>
  );
}

export default Detection;