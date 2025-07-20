import React from "react";
import { cn } from "../lib/utils";

export interface TabsProps {
  options: string[];
  active: string;
  onChange: (tab: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  options,
  active,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex border-b border-thin bg-background-primary",
        className
      )}
    >
      {options.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            className={cn(
              "px-4 py-3 text-base font-medium transition-colors duration-fast border-b-2",
              isActive
                ? "text-text-primary border-b-accent-primary"
                : "text-text-secondary border-b-transparent hover:text-text-primary"
            )}
            onClick={() => onChange(tab)}
            type="button"
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
