import { getCurrentWindow } from "@tauri-apps/api/window";
import { motion } from "framer-motion";
import { Maximize2, Minus, X } from "lucide-react";
import { useState } from "react";

interface TitleBarProps {
  title: string;
}

export default function TitleBar({ title }: TitleBarProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = async () => {
    await getCurrentWindow().minimize();
  };

  const handleMaximize = async () => {
    setIsMaximized(!isMaximized);
    const isMax = await getCurrentWindow().isMaximized();
    if (isMax) {
      await getCurrentWindow().unmaximize();
    } else {
      await getCurrentWindow().maximize();
    }
  };

  const handleClose = async () => {
    await getCurrentWindow().close();
  };

  return (
    <motion.div
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-15 glass border-b border-surface-glass_border z-50 flex items-center justify-between px-6 shadow-xl"
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    >
      {/* Left side - App info */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 glass border border-surface-glass_border rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-accent-primary text-sm font-bold">G</span>
        </div>
        <span className="text-text-primary font-medium text-lg">{title}</span>
      </div>

      {/* Right side - Window controls */}
      <div
        className="flex items-center space-x-1"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMinimize}
          className="p-2 text-text-secondary hover:text-text-primary transition-colors glass rounded-md border border-surface-glass_border"
        >
          <Minus className="w-4 h-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMaximize}
          className="p-2 text-text-secondary hover:text-text-primary transition-colors glass rounded-md border border-surface-glass_border"
        >
          <Maximize2 className="w-4 h-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="p-2 text-text-secondary hover:text-state-error transition-colors glass rounded-md border border-surface-glass_border hover:bg-state-error/10"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
