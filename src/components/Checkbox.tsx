import React from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={[
          "w-4 h-4 rounded-sm border border-interactive-checkbox_unchecked bg-transparent appearance-none transition-colors duration-fast focus:ring-2 focus:ring-accent-focus",
          "checked:bg-interactive-checkbox_checked checked:border-interactive-checkbox_checked checked:after:content-[''] checked:after:block checked:after:w-2 checked:after:h-2 checked:after:mx-auto checked:after:my-auto checked:after:bg-text-primary checked:after:rounded-sm",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        ].join(" ")}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";
export default Checkbox;
