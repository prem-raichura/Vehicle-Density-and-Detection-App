// Footer.jsx
import React from "react";
import DeveloperLink from "./DeveloperLink";

const Footer = () => {
  return (
    <footer className="w-full h-14 bg-gradient-to-r from-[#2563eb] to-[#22d3ee] flex items-center justify-between px-6 md:px-10 shadow-inner">
      <div className="text-sm text-white opacity-90">
        © {new Date().getFullYear()} Traffic Density & Detection System.
      </div>

      <div className="text-sm text-white">
        <DeveloperLink />
      </div>
    </footer>
  );
};

export default Footer;
