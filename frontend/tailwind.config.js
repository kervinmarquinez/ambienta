// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Poppins para el texto (por defecto)
        body: ["var(--font-poppins)", "sans-serif"], 
        // Kanit para los títulos
        heading: ["var(--font-kanit)", "serif"], 
      },
      colors: {
        primary: "var(--primary)",
      }
    },
  },
  plugins: [],
};
