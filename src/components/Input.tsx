import React from "react";
import { cn } from "../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant = "default", leftIcon, rightIcon, error, ...props },
    ref
  ) => {
    const base =
      "w-full rounded-md transition-colors duration-fast focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm";
    const variants = {
      default:
        "bg-surface-card border border-thin text-text-primary placeholder-text-muted px-3 py-2 focus:border-accent-focus",
      search:
        "bg-surface-card border border-thin text-text-primary placeholder-text-muted px-3 py-2 focus:border-accent-focus",
    };
    const errorClass = error
      ? "border-state-error focus:border-state-error"
      : "";
    return (
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            base,
            variants[variant],
            errorClass,
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
