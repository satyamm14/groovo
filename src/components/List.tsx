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
}

const List: React.FC<ListProps> = ({ items, className }) => {
  return (
    <ul className={`space-y-1 ${className || ""}`}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-150 text-left gap-3 font-medium text-white/90 hover:bg-white/10 focus:outline-none border
              ${
                item.active
                  ? "bg-white/10 border-purple-400 shadow-md"
                  : "bg-white/3 border-white/10"
              }
            `}
            onClick={item.onClick}
          >
            <item.icon className="w-4 h-4 mr-2 text-purple-300" />
            <span>{item.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default List;
