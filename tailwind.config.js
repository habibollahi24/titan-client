/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      colors: {
        primary: {
          900: "#4a6dff",
          800: " #5c7cff",
          700: "#6e8aff",
          600: "#8099ff",
          500: "#92a7ff",
          400: "#a4b6ff",
          300: "#b7c5ff",
          200: "#c9d3ff",
          100: "#dbe2ff",
          50: "#e4e9ff",
        },
        secondary: {
          900: "#111827",
          800: "#1f2937",
          700: "#374151",
          600: "#4b5563",
          500: "#6b7280",
          400: "#9ca3af",
          300: "#d1d5db",
          200: "#e5e7eb",
          100: "#f3f4f6",
          50: "#f9fafb",
        },
        success: "#00c073",
        warning: "#ff9900",
        error: "#ff4757",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/aspect-ratio"),
    // eslint-disable-next-line no-undef
    require("@tailwindcss/forms")({ strategy: "class" }),
    // eslint-disable-next-line no-undef
    require("tailwindcss-animate"),
  ],
};
