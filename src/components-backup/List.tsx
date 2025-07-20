import React from "react";

export interface ListItem {
  id: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
}

interface ListProps {
  items: ListItem[];
  className?: string;
  variant?: "navigation" | "table";
}

const List: React.FC<ListProps> = ({
  items,
  className,
  variant = "navigation",
}) => {
  if (variant === "table") {
    return (
      <div className={`space-y-1 ${className || ""}`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between h-14 px-4 py-2 border-b border-surface-glass_border hover:bg-surface-glass transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-accent-primary" />
              <span className="text-text-primary font-medium">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className={`space-y-1 ${className || ""}`}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            className={`flex items-center w-full px-4 py-3 rounded-md transition-all duration-200 text-left gap-3 font-medium text-text-primary hover:bg-surface-glass focus:outline-none border
              ${
                item.active
                  ? "bg-accent-primary/20 border-accent-primary text-accent-primary shadow-md"
                  : "bg-surface-card border-surface-glass_border"
              }
            `}
            onClick={item.onClick}
          >
            <item.icon className="w-5 h-5 text-accent-primary" />
            <span>{item.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default List;
