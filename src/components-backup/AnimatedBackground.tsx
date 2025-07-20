import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base background */}
      <div className="absolute inset-0 bg-background-primary" />

      {/* Gradient overlay from design system */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(66, 102, 255, 0.1), rgba(156, 102, 255, 0.1))",
        }}
      />

      {/* Animated accent gradient blob */}
      <motion.div
        className="absolute left-1/3 top-1/2 w-[60vw] h-[60vw] max-w-2xl max-h-2xl bg-gradient-to-br from-accent-primary/20 via-accent-secondary/15 to-transparent rounded-full blur-3xl"
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

      {/* Secondary animated blob */}
      <motion.div
        className="absolute right-1/4 top-1/4 w-[40vw] h-[40vw] max-w-xl max-h-xl bg-gradient-to-br from-accent-tertiary/15 via-accent-neon_blue/10 to-transparent rounded-full blur-2xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
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
