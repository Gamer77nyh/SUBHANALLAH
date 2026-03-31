/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c3d66",
          950: "#051e3e",
        },
        navy: {
          50: "#f7f9fc",
          100: "#eff4f9",
          200: "#d9e5f0",
          300: "#b8cfe3",
          400: "#8aafcf",
          500: "#5f8fb5",
          600: "#486f95",
          700: "#39567a",
          800: "#2d4563",
          900: "#1e3a5f",
          950: "#0f1e32",
        },
        gold: {
          50: "#fffbf0",
          100: "#fff3da",
          200: "#ffe5b4",
          300: "#ffd699",
          400: "#ffc857",
          500: "#d4af37",
          600: "#b8961f",
          700: "#9a7a1a",
          800: "#7a6019",
          900: "#5a481a",
          950: "#3a280f",
        },
      },
      spacing: {
        "nav-height": "80px",
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
