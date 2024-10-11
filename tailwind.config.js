/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-500": "#9966cc",
        "primary-600": "#7943ad",
        "primary-700": "#663b8e",
        "primary-800": "#533172",
        "secondary-500": "#FFB620",
        "off-white": "#D0DFFF",
        red: "#FF5A5A",
        // "bright-1": "#ebe5ef",
        // "bright-2": "#d6cadd",
        // "bright-3": "#c4b3cd",
        // "bright-4": "#ab94b8",
        //=====================
        // "bright-1": "#edddea",
        // "bright-2": "#d8b2d1",
        // "bright-3": "#cb9bc1",
        // "bright-4": "#b97bab",
        //=====================
        "bright-1": "#f3eded",
        "bright-2": "#e9dfdf",
        "bright-3": "#d8cac9",
        "bright-4": "#c4aead",
        //dark theme
        "dark-1": "#2a2729",
        "dark-2": "#403a3d",
        "dark-3": "#494346",
        "dark-4": "#534b4f",
        "light-1": "#d8bfd8   ",
        "light-2": "#EFEFEF",
        "light-3": "#7a7bb1",
        "light-4": "#a8afd1",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      translate: ["active"],
    },
  },
  plugins: [require("tailwindcss-animate")],
  exports: {
    important: true,
  },
};
