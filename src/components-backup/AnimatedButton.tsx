import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";
import { cn } from "../lib/utils";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "destructive"
    | "outline"
    | "icon";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
  glow?: boolean;
  glowColor?: "primary" | "secondary" | "subtle";
  fullWidth?: boolean;
  loading?: boolean;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      onClick,
      variant = "primary",
      size = "md",
      className = "",
      disabled = false,
      glow = false,
      glowColor = "primary",
      fullWidth = false,
      loading = false,
    },
    ref
  ) => {
    const baseClasses =
      "font-medium transition-all duration-200 rounded-xl flex items-center justify-center gap-2 focus:outline-none";

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-accent-primary to-accent-secondary text-text-primary rounded-xl hover:glow-primary",
      secondary:
        "bg-surface-elevated text-text-primary border border-surface-glass_border rounded-xl hover:bg-surface-card",
      ghost:
        "text-text-secondary hover:text-text-primary hover:bg-surface-glass",
      destructive: "bg-state-error hover:bg-red-600 text-white",
      outline:
        "border border-surface-glass_border bg-transparent hover:bg-surface-glass text-text-primary",
      icon: "bg-transparent rounded-full w-10 h-10 hover:bg-surface-glass",
    };

    const sizeClasses = {
      xs: "h-7 px-2 text-xs font-medium",
      sm: "h-8 px-4 text-sm font-medium",
      md: "h-10 px-6 text-base font-medium",
      lg: "h-12 px-8 text-lg font-medium",
      xl: "h-14 px-10 text-xl font-semibold",
    };

    const glowClasses = {
      primary: "glow-primary",
      secondary: "glow-secondary",
      subtle: "glow-subtle",
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
          glow && glowClasses[glowColor],
          className
        )}
        whileHover={disabled || loading ? {} : { scale: 1.02 }}
        whileTap={disabled || loading ? {} : { scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
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
