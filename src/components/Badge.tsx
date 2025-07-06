import { ReactNode, forwardRef } from "react";
import { cn } from "../lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, variant = "default", size = "md", className }, ref) => {
    const variantClasses = {
      default: "bg-slate-800 text-purple-300 border border-purple-500",
      secondary: "bg-slate-800 text-gray-300 border border-white/20",
      destructive: "bg-red-500/20 text-red-300 border border-red-500/30",
      outline: "border border-white/20 text-white bg-transparent",
      success: "bg-green-500/20 text-green-300 border border-green-500/30",
    };

    const sizeClasses = {
      sm: "px-2 py-0.5 text-xs font-medium",
      md: "px-2.5 py-0.5 text-sm font-medium",
      lg: "px-3 py-1 text-sm font-medium",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-normal transition-colors",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
