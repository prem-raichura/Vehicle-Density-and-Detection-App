import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function UploadZone({ setResult, setMedia, setLoading }) {
  const [file, setFile] = useState(null);
  const [isDrag, setIsDrag] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDrag(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image or video file.");
    setLoading(true);
    setResult(null);
    setMedia(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      // const res = await axios.post("http://127.0.0.1:8000/detect", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_URL}/detect`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      setMedia(res.data.processed_url);
    } catch (err) {
      console.error(err);
      alert("Error processing file.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDrag(true)}
      onDragLeave={() => setIsDrag(false)}
      className={`w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${
        isDrag ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-100"
      }`}
    >
      <CloudArrowUpIcon className="w-14 h-14 text-blue-500 mb-4" />
      <p className="text-gray-700 font-medium mb-3 text-sm md:text-base">
        Drag & drop a file here or click to browse
      </p>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="hidden"
        id="fileUpload"
      />
      <label
        htmlFor="fileUpload"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg cursor-pointer mt-2 shadow-md transition"
      >
        {file ? `Selected: ${file.name}` : "Choose File"}
      </label>

      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="mt-5 bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition-all"
      >
        Detect Vehicles
      </motion.button>
    </form>
  );
}
