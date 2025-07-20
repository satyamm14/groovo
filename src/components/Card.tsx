import React from "react";
import { cn } from "../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "media" | "artwork";
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "media",
  hoverable = true,
  ...props
}) => {
  const base =
    "bg-surface-card overflow-hidden transition-transform duration-normal";
  const variants = {
    media: "rounded-lg aspect-square shadow-md",
    artwork: "rounded-lg w-40 h-40 shadow-md",
  };
  return (
    <div
      className={cn(
        base,
        variants[variant],
        hoverable && "hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
