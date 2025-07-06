import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";
import { ANIMATIONS } from "../constants/animations";
import { cn } from "../lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glowColor?: "purple" | "pink" | "white";
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
    { children, className, hover = false, glow = false, glowColor = "purple" },
    ref
  ) => {
    const glowEffect = glow
      ? {
          boxShadow:
            ANIMATIONS.GLOW[
              glowColor.toUpperCase() as keyof typeof ANIMATIONS.GLOW
            ],
        }
      : {};

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-lg border border-white/10 bg-slate-800/50 backdrop-blur-xl",
          className
        )}
        whileHover={
          hover
            ? {
                scale: ANIMATIONS.CARD.HOVER_SCALE,
                y: ANIMATIONS.CARD.HOVER_Y,
                ...glowEffect,
                transition: {
                  duration: ANIMATIONS.DURATION.NORMAL,
                  ease: ANIMATIONS.EASE.SMOOTH,
                },
              }
            : {}
        }
      >
        {children}
      </motion.div>
    );
  }
);

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)}>
      {children}
    </div>
  )
);

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  )
);

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)}>
      {children}
    </div>
  )
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardFooter, CardHeader };
