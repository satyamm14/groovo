import React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  loading = false,
  disabled,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors duration-fast rounded-md focus:outline-none focus:ring-2 focus:ring-accent-focus disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-accent-primary text-text-primary px-4 py-2 text-sm rounded-md hover:bg-accent-primary_hover focus:ring-2 focus:ring-accent-focus",
    secondary:
      "bg-surface-card text-text-primary border border-thin px-4 py-2 text-sm rounded-md hover:bg-surface-hover",
    icon: "bg-transparent w-8 h-8 p-0 flex items-center justify-center rounded-md hover:bg-surface-hover",
  };
  return (
    <button
      className={cn(base, variants[variant], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
