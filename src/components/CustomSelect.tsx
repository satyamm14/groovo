import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "py-1.5 pl-2 pr-7 text-sm min-h-[32px]",
  md: "py-2 pl-3 pr-8 text-base min-h-[40px]",
  lg: "py-3 pl-4 pr-10 text-lg min-h-[48px]",
};

export default function CustomSelect({
  value,
  onChange,
  options,
  size = "md",
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

  // Dropdown element for portal
  const dropdown = open
    ? createPortal(
        <ul
          style={dropdownStyle}
          className="rounded-md bg-slate-800/95 shadow-lg ring-1 ring-black/10 focus:outline-none border border-white/10"
          tabIndex={-1}
          role="listbox"
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              className={`cursor-pointer select-none text-white hover:bg-purple-500/20 ${
                sizeClasses[size]
              } ${option.value === value ? "bg-purple-500/10" : ""} ${
                highlighted === i ? "bg-purple-500/20" : ""
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
    <div className="relative w-48">
      <button
        ref={buttonRef}
        type="button"
        className={`flex w-full items-center justify-between rounded-md border border-white/10 bg-white/5 text-left text-white shadow-md focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-colors ${sizeClasses[size]}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>
          {options.find((o) => o.value === value)?.label || options[0].label}
        </span>
        <svg
          className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {dropdown}
    </div>
  );
}
