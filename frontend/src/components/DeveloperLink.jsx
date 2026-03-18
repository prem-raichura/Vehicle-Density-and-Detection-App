import { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedLink = ({ href, name }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-block font-bold transition-transform duration-300 ease-in-out mx-1"
      style={{
        // Changed #f5f5f5 to #6b7280 (gray-500) so it's visible on your light footer
        color: hovered ? '#E6007A' : '#6b7280', 
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        textShadow: hovered ? '0 0 8px rgba(230,0,122,0.4)' : 'none',
      }}
    >
      {name}
      <svg
        className="absolute left-0 w-full h-4 -bottom-2"
        viewBox="0 0 210 25"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 5 20 C 60 10, 150 10, 205 20"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="6 6"
          initial={{ pathLength: 0, stroke: "rgba(107, 114, 128, 0.3)" }}
          animate={{
            pathLength: hovered ? 1 : 0,
            stroke: hovered ? "#E6007A" : "rgba(107, 114, 128, 0.3)",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>
    </a>
  );
};

const DeveloperLink = () => {
  return (
    <span className="text-[10px] text-gray-500 flex items-center flex-wrap justify-center tracking-wide">
      Developed by 
      <AnimatedLink href="https://unicorn03.vercel.app/" name="Charmi Padh" />
      <span className="mx-0.5">&</span>
      <AnimatedLink href="https://premraichura.me/" name="Prem Raichura" />
    </span>
  );
};

export default DeveloperLink;