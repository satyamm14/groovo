import React from "react";
import { cn } from "../lib/utils";

export interface ListColumn {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface ListRow {
  id: string;
  [key: string]: any;
}

export interface ListProps {
  columns: ListColumn[];
  rows: ListRow[];
  selectedIds?: string[];
  onRowClick?: (id: string) => void;
  className?: string;
}

const List: React.FC<ListProps> = ({
  columns,
  rows,
  selectedIds = [],
  onRowClick,
  className,
}) => {
  return (
    <div className={cn("w-full text-sm", className)}>
      <div className="flex bg-background-primary border-b border-thin">
        {columns.map((col) => (
          <div
            key={col.key}
            className={cn(
              "px-4 py-3 font-medium text-text-secondary",
              col.align === "center" && "text-center",
              col.align === "right" && "text-right",
              col.width && `w-[${col.width}]`
            )}
          >
            {col.label}
          </div>
        ))}
      </div>
      {rows.map((row) => {
        const selected = selectedIds.includes(row.id);
        return (
          <div
            key={row.id}
            className={cn(
              "flex items-center border-b border-[rgba(255,255,255,0.05)] transition-colors duration-fast cursor-pointer",
              selected ? "bg-state-selected" : "hover:bg-surface-hover",
              "h-12"
            )}
            onClick={() => onRowClick?.(row.id)}
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className={cn(
                  "px-4 py-2 truncate",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                  col.width && `w-[${col.width}]`
                )}
              >
                {row[col.key]}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default List;
