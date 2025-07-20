import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "search" | "ghost";
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = "md",
      variant = "default",
      error = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "flex w-full rounded-xl transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-normal";

    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    };

    const variantClasses = {
      default:
        "bg-surface-elevated border border-surface-glass_border text-text-primary placeholder-text-muted focus:border-accent-primary focus:glow-subtle",
      search:
        "bg-surface-elevated border border-surface-glass_border text-text-primary placeholder-text-muted focus:border-accent-primary focus:glow-subtle",
      ghost:
        "bg-transparent border-none text-text-primary placeholder-text-muted",
    };

    const errorClasses = error
      ? "border-state-error focus:border-state-error"
      : "";

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            baseClasses,
            sizeClasses[size],
            variantClasses[variant],
            errorClasses,
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
