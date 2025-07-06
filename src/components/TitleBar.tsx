import { motion } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { useState } from "react";
import { ANIMATIONS } from "../constants/animations";

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
      initial={{ y: ANIMATIONS.TITLEBAR.INITIAL_Y }}
      animate={{ y: ANIMATIONS.TITLEBAR.ANIMATE_Y }}
      className="fixed top-0 left-0 right-0 h-12 bg-white/10 backdrop-blur-2xl border-b border-white/20 z-50 flex items-center justify-between px-4 shadow-2xl"
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    >
      {/* Left side - App info */}
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md flex items-center justify-center shadow-lg">
          <span className="text-purple-400 text-xs font-bold">G</span>
        </div>
        <span className="text-white font-medium">{title}</span>
      </div>

      {/* Right side - Window controls */}
      <div
        className="flex items-center space-x-2"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        <motion.button
          whileHover={{ scale: ANIMATIONS.TITLEBAR.BUTTON_HOVER_SCALE }}
          whileTap={{ scale: ANIMATIONS.BUTTON.TAP_SCALE }}
          onClick={handleMinimize}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <Minus className="w-4 h-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: ANIMATIONS.TITLEBAR.BUTTON_HOVER_SCALE }}
          whileTap={{ scale: ANIMATIONS.BUTTON.TAP_SCALE }}
          onClick={handleMaximize}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <Square className="w-4 h-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: ANIMATIONS.TITLEBAR.BUTTON_HOVER_SCALE }}
          whileTap={{ scale: ANIMATIONS.BUTTON.TAP_SCALE }}
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
