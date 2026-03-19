import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function MediaFeed({ 
  previewUrl, selectedFile, isReadyToDetect, isProcessing, 
  onFileUpload, onReset, setResult, setMedia, setLoading, setIsReadyToDetect 
}) {

  const handleDetection = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setIsReadyToDetect(false);

    const formData = new FormData();
    formData.append("file", selectedFile);

    /* try {
      const res = await axios.post("http://127.0.0.1:8000/detect", formData);

      // Map backend class_counts to chart array
      const chartData = Object.entries(res.data.class_counts).map(([label, count]) => ({
        label,
        count,
        color: label === "Car" ? "#3f7aa3" : label === "Truck" ? "#7a3a3a" : "#d97706"
      })); */
    try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await axios.post(`${API_URL}/detect`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        const classCounts = res.data?.class_counts || {};

        // If empty → you can either keep it empty OR add a default entry
        const chartData =
          Object.keys(classCounts).length > 0
            ? Object.entries(classCounts).map(([label, count]) => ({
                label,
                count: count ?? 0,
                color:
                  label === "Car"
                    ? "#3f7aa3"
                    : label === "Truck"
                    ? "#7a3a3a"
                    : "#d97706",
              }))
            : [
                {
                  label: "No Data",
                  count: 0,
                  color: "#9ca3af",
                },
              ]; 

        setResult({
          totalVehicles: res.data?.vehicles ?? 0,
          classes: chartData, 
          fps: res.data?.fps ?? 0,
          density: res.data?.density ?? "Unknown",
        });
        
        if (res.data.processed_url) {
          // Cache busting to ensure the new image/video loads
          const finalUrl = `${res.data.processed_url}?t=${new Date().getTime()}`;
          setMedia(finalUrl);
        }

    } catch (err) {
      console.error("Detection Error:", err);
      alert("Connection to backend failed!");
      setIsReadyToDetect(true);
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Logic to detect if the URL is a video or image even with query params
  const isVideoFile = () => {
    if (!previewUrl) return false;
    // Check original file type
    if (selectedFile?.type?.startsWith("video")) return true;
    // Check URL content before the '?' 
    const cleanUrl = previewUrl.split('?')[0].toLowerCase();
    return cleanUrl.endsWith(".mp4") || cleanUrl.endsWith(".avi") || cleanUrl.endsWith(".mov");
  };

  return (
    <div className={`w-full lg:w-[60%] aspect-video rounded-4xl shadow-2xl relative flex items-center justify-center border-4 md:border-8 border-white overflow-hidden transition-all duration-500 ${previewUrl ? 'bg-black' : 'bg-[#f3f4f6]'}`}>
      {!previewUrl ? (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-200 transition-all p-6">
          <div className="w-16 h-16 bg-white text-gray-400 rounded-3xl flex items-center justify-center mb-4 shadow-sm">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Media</p>
          <input type="file" className="hidden" onChange={onFileUpload} accept="video/*,image/*" />
        </label>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          {isVideoFile() ? (
            <video key={previewUrl} src={previewUrl} className="w-full h-full object-contain" autoPlay loop muted playsInline />
          ) : (
            <img key={previewUrl} src={previewUrl} alt="Result" className="w-full h-full object-contain" />
          )}

          <AnimatePresence>
            {isReadyToDetect && !isProcessing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20">
                <button onClick={handleDetection} className="bg-[#3f7aa3] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs shadow-2xl hover:scale-105 transition-transform">
                  Detect Vehicles
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {isProcessing && (
            <motion.div initial={{ top: "0%" }} animate={{ top: "100%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-[#3f7aa3] shadow-[0_0_25px_#3f7aa3] z-50" />
          )}

          <button onClick={onReset} className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white z-30 hover:bg-red-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default MediaFeed;