import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost";
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
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    const variantClasses = {
      default:
        "bg-slate-800 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:border-purple-500",
      ghost: "bg-transparent border-none text-white placeholder-gray-400",
    };

    const errorClasses = error ? "border-red-500 focus:border-red-500" : "";

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "flex w-full rounded-lg transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-normal",
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
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
