import { motion } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { useState } from "react";

interface TitleBarProps {
  title: string;
}

export default function TitleBar({ title }: TitleBarProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = () => {
    // TODO: Implement minimize functionality with Tauri
    console.log("Minimize clicked");
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    // TODO: Implement maximize functionality with Tauri
    console.log("Maximize clicked");
  };

  const handleClose = () => {
    // TODO: Implement close functionality with Tauri
    console.log("Close clicked");
  };

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-12 bg-black/20 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-4"
      style={{ WebkitAppRegion: "drag" }}
    >
      {/* Left side - App info */}
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
          <span className="text-white text-xs font-bold">G</span>
        </div>
        <span className="text-white font-medium">{title}</span>
      </div>

      {/* Right side - Window controls */}
      <div
        className="flex items-center space-x-2"
        style={{ WebkitAppRegion: "no-drag" }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMinimize}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
        >
          <Minus className="w-4 h-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMaximize}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
        >
          <Square className="w-4 h-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
