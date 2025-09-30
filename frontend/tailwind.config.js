import daisyui from 'daisyui' 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    require("@tailwindcss/typography"),
  ],
  daisyui: {
    themes: ["light", "dark", "forest", "sunset","cmyk","dim","lofi","night","coffee","cupcake","synthwave"],
  },
}