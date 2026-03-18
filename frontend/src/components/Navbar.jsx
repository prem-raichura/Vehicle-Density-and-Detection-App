import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BarChart3, Camera } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Detection", path: "/detection", icon: <Camera size={18} /> },
    
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-linear-to-r from-[#3f7aa3]/80 via-[#6a5a6a]/70 to-[#7a3a3a]/80 border-b border-white/20 shadow-lg text-white px-6 py-4">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo → Home */}
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-wide hover:opacity-80 transition">
          TrafficEye
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-lg">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative flex items-center gap-2 group"
              >
                {item.icon}
                {item.name}

                {/* Underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-orange-300 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>

                {/* Active glow */}
                {isActive && (
                  <span className="absolute -inset-2 bg-orange-300/10 blur-md rounded-lg -z-10"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col mt-4 gap-4 md:hidden text-lg max-w-7xl mx-auto backdrop-blur-md bg-white/10 p-4 rounded-lg">

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 ${
                  isActive ? "text-orange-300" : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}

        </div>
      )}

    </nav>
  );
}

export default Navbar;