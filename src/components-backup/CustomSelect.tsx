import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  disabled?: boolean;
}

const sizeClasses = {
  sm: "py-1.5 pl-3 pr-8 text-sm min-h-[32px]",
  md: "py-2 pl-4 pr-10 text-base min-h-[40px]",
  lg: "py-3 pl-6 pr-12 text-lg min-h-[48px]",
};

export default function CustomSelect({
  value,
  onChange,
  options,
  size = "md",
  placeholder = "Select an option",
  disabled = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (!buttonRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        setHighlighted((h) => (h < options.length - 1 ? h + 1 : 0));
      } else if (e.key === "ArrowUp") {
        setHighlighted((h) => (h > 0 ? h - 1 : options.length - 1));
      } else if (e.key === "Enter" && highlighted >= 0) {
        onChange(options[highlighted].value);
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, highlighted, options, onChange]);

  useEffect(() => {
    if (open) setHighlighted(options.findIndex((o) => o.value === value));
  }, [open, value, options]);

  // Portal dropdown positioning
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [open]);

  const selectedOption = options.find((o) => o.value === value);

  // Dropdown element for portal
  const dropdown = open
    ? createPortal(
        <ul
          style={dropdownStyle}
          className="rounded-xl bg-surface-elevated/95 glass shadow-xl ring-1 ring-surface-glass_border focus:outline-none border border-surface-glass_border"
          tabIndex={-1}
          role="listbox"
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              className={`cursor-pointer select-none text-text-primary hover:bg-accent-primary/10 ${
                sizeClasses[size]
              } ${option.value === value ? "bg-accent-primary/10" : ""} ${
                highlighted === i ? "bg-accent-primary/20" : ""
              }`}
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              onMouseEnter={() => setHighlighted(i)}
            >
              {option.label}
            </li>
          ))}
        </ul>,
        document.body
      )
    : null;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border border-surface-glass_border bg-surface-elevated text-text-primary placeholder-text-muted transition-all duration-200 focus:outline-none focus:border-accent-primary focus:glow-subtle disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[size],
          !selectedOption && "text-text-muted"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-text-muted transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {dropdown}
    </div>
  );
}
