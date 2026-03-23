// DeveloperLink.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const DeveloperLink = () => {
  const [devHovered, setDevHovered] = useState(false);
  const [designHovered, setDesignHovered] = useState(false);

  return (
    <span className="text-sm text-secondary-gray">
      Developed by{' '}
      <a
        href="https://premraichura.me/"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setDevHovered(true)}
        onMouseLeave={() => setDevHovered(false)}
        className="relative inline-block font-medium transition-transform duration-300 ease-in-out"
        style={{
          color: devHovered ? '#E6007A' : '#3b3131',
          transform: devHovered ? 'translateY(-2px)' : 'translateY(0)',
          textShadow: devHovered ? '0 0 8px rgba(230,0,122,0.6)' : 'none',
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
            initial={{ pathLength: -1, stroke: "#ececec" }}
            animate={{
              pathLength: devHovered ? 1 : 0,
              stroke: devHovered ? "#E6007A" : "#ececec",
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </svg>
      </a>

      {' | '}

      Designed by{' '}
      <a  
        href="https://unicorn03.vercel.app/"
        target="_blank"
        style={{
          color: designHovered ? '#000' : '#3b3131',
          textDecoration: designHovered ? 'underline' : 'none',
          textDecorationColor: '#000',
          transition: 'all 0.3s ease',
        }}
        rel="noopener noreferrer"
        onMouseEnter={() => setDesignHovered(true)}
        onMouseLeave={() => setDesignHovered(false)}
      >
        Charmi Padh
        
      </a>
    </span>
  );
};

export default DeveloperLink;