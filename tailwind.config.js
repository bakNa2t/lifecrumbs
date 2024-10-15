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
        "primary-400": "#a574d8",
        "primary-500": "#9966cc",
        "primary-600": "#7943ad",
        "primary-700": "#663b8e",
        "primary-800": "#533172",
        "secondary-500": "#FFB620",
        "off-white": "#D0DFFF",
        red: "#FF5A5A",
        //=====light theme=====
        "bright-1": "#f3eded",
        "bright-2": "#d8cac9",
        "bright-3": "#c4aead",
        "bright-4": "#917271",
        //=====dark theme=====
        "dark-1": "#2a2729",
        "dark-2": "#403a3d",
        "dark-3": "#494346",
        "dark-4": "#534b4f",
        //=====light modifier
        "light-1": "#d8bfd8   ",
        "light-2": "#EFEFEF",
        "light-3": "#7a7bb1",
        "light-4": "#a8afd1",
        //=====dark modifier
        "dusk-1": "#a8afd1",
        "dusk-2": "#7a7bb1",
        "dusk-3": "#EFEFEF",
        "dusk-4": "#d8bfd8",
      },
      boxShadow: {
        "shd-logo": "0px 0px 10px 2px rgba(138,43,226, 0.5)",
        "shd-btn": "0px 0px 4px 2px rgba(138,43,226, 0.8)",
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
