import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";
import { cn } from "../lib/utils";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "ghost"
    | "destructive"
    | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
  glow?: boolean;
  glowColor?: "purple" | "pink" | "white";
  fullWidth?: boolean;
  loading?: boolean;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      onClick,
      variant = "default",
      size = "sm",
      className = "",
      disabled = false,
      glow = false,
      glowColor = "purple",
      fullWidth = false,
      loading = false,
    },
    ref
  ) => {
    const baseClasses =
      "font-normal transition-all duration-200 rounded-lg flex items-center justify-center gap-2 focus:outline-none";

    const variantClasses = {
      default:
        "bg-slate-800 hover:bg-slate-700 backdrop-blur-sm border border-white/20 text-white",
      primary:
        "bg-slate-800 hover:bg-slate-700 border-2 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]",
      secondary: "bg-slate-800 hover:bg-slate-700 text-white",
      ghost: "text-gray-300 hover:text-white hover:bg-white/10",
      destructive: "bg-red-500 hover:bg-red-600 text-white",
      outline:
        "border border-white/20 bg-transparent hover:bg-white/10 text-white",
    };

    const sizeClasses = {
      xs: "h-7 px-2 text-xs font-medium",
      sm: "h-8 px-3 text-sm font-medium",
      md: "h-9 px-4 text-sm font-medium",
      lg: "h-10 px-6 text-sm font-medium",
      xl: "h-12 px-8 text-base font-medium",
    };

    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          disabled && "opacity-50 cursor-not-allowed",
          loading && "cursor-wait",
          className
        )}
        whileHover={disabled || loading ? {} : {}}
        whileTap={disabled || loading ? {} : {}}
      >
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
