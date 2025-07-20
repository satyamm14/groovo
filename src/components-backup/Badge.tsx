import { forwardRef } from "react";
import { cn } from "../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, variant = "default", size = "md", className }, ref) => {
    const baseClasses =
      "inline-flex items-center rounded-full font-medium transition-colors";

    const variantClasses = {
      default:
        "bg-accent-primary/20 text-accent-primary border border-accent-primary/30",
      secondary:
        "bg-surface-elevated text-text-secondary border border-surface-glass_border",
      destructive:
        "bg-state-error/20 text-state-error border border-state-error/30",
      outline:
        "border border-surface-glass_border text-text-primary bg-transparent",
      success:
        "bg-state-success/20 text-state-success border border-state-success/30",
      warning:
        "bg-state-warning/20 text-state-warning border border-state-warning/30",
      info: "bg-state-info/20 text-state-info border border-state-info/30",
    };

    const sizeClasses = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
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
