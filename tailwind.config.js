/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#1a1a1a",
          secondary: "#2d2d2d",
          tertiary: "#333333",
          app_chrome: "#0f0f0f",
        },
        surface: {
          card: "#2d2d2d",
          elevated: "#3d3d3d",
          selected: "#404040",
          hover: "#454545",
        },
        accent: {
          primary: "#0078d4",
          primary_hover: "#106ebe",
          secondary: "#5c9bd5",
          focus: "#00bcf2",
        },
        text: {
          primary: "#ffffff",
          secondary: "#cccccc",
          muted: "#999999",
          disabled: "#666666",
        },
        interactive: {
          checkbox_unchecked: "#666666",
          checkbox_checked: "#0078d4",
          button_primary: "#0078d4",
          button_secondary: "#404040",
        },
        state: {
          selected: "#0078d4",
          playing: "#00bcf2",
          error: "#ff4444",
          warning: "#ffaa00",
        },
      },
      fontFamily: {
        primary: ["Segoe UI", "system-ui", "-apple-system", "sans-serif"],
        monospace: ["Consolas", "'Courier New'", "monospace"],
      },
      fontSize: {
        xs: "11px",
        sm: "12px",
        base: "14px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "48px",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: "1.2",
        normal: "1.4",
        relaxed: "1.6",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        md: "4px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      spacing: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "48px",
      },
      boxShadow: {
        none: "none",
        sm: "0 1px 2px rgba(0,0,0,0.5)",
        md: "0 2px 4px rgba(0,0,0,0.3)",
        lg: "0 4px 8px rgba(0,0,0,0.2)",
        context: "0 8px 16px rgba(0,0,0,0.4)",
      },
      borderColor: {
        thin: "#404040",
        accent: "#0078d4",
        focus: "#00bcf2",
      },
      transitionTimingFunction: {
        out: "ease-out",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
      },
    },
  },
  plugins: [],
};
