import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900" />
      {/* Subtle accent gradient blob */}
      <motion.div
        className="absolute left-1/3 top-1/2 w-[60vw] h-[60vw] max-w-2xl max-h-2xl bg-gradient-to-br from-purple-700/30 via-fuchsia-700/20 to-transparent rounded-full blur-3xl opacity-70"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
      </div>
    </div>
  );
}
