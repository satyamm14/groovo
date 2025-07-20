import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";
import { cn } from "../lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "compact";
  hover?: boolean;
  glow?: boolean;
  glowColor?: "primary" | "secondary" | "subtle";
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = "primary",
      hover = false,
      glow = false,
      glowColor = "primary",
    },
    ref
  ) => {
    const baseClasses = "transition-all duration-300";

    const variantClasses = {
      primary: "glass rounded-2xl p-5 hover:glow-primary hover:-translate-y-1",
      compact:
        "bg-surface-elevated rounded-xl p-4 border border-surface-glass_border",
    };

    const glowClasses = {
      primary: "glow-primary",
      secondary: "glow-secondary",
      subtle: "glow-subtle",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          hover && variantClasses.primary,
          glow && glowClasses[glowColor],
          className
        )}
        whileHover={hover ? { scale: 1.02, y: -4 } : {}}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    );
  }
);

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-2 mb-4", className)}>
      {children}
    </div>
  )
);

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("space-y-3", className)}>
      {children}
    </div>
  )
);

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between pt-4 mt-4 border-t border-surface-glass_border",
        className
      )}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardFooter, CardHeader };
