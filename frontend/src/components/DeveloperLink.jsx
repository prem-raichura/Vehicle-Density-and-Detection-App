// DeveloperLink.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const DeveloperLink = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <span className="text-sm text-secondary-gray">
      Developed by {' '}
      <a
        href="https://premraichura.me/"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative inline-block font-medium transition-transform duration-300 ease-in-out"
        style={{
          color: hovered ? '#E6007A' : '#f5f5f5',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          textShadow: hovered ? '0 0 8px rgba(230,0,122,0.6)' : 'none',
        }}
      >
        Prem Raichura
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
            initial={{ pathLength: 0, stroke: "rgba(17, 24, 39, 0.5)" }} // text-gray-900/50
            animate={{
              pathLength: hovered ? 1 : 0,
              stroke: hovered ? "#E6007A" : "rgba(17, 24, 39, 0.5)", // pink on hover
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </svg>
      </a>
    </span>
  );
};

export default DeveloperLink;
