/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    colors: {
      mybg: "#EBF0F4",
      white: "#ffffff",
      gray: "#9ca3af"

    },
    container: {
      center: true,
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#0284c7",

          "secondary": "#0e7490",

          "accent": "#1fb2a6",

          "neutral": "#2a323c",

          "base-100": "#EBF0F4",

          "info": "#3abff8",

          "success": "#36d399",

          "warning": "#fbbd23",

          "error": "#f87272",
        },
      },
    ],

  },

  plugins: [require("daisyui")],
}

