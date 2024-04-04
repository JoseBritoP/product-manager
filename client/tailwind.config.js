/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens:{
        sm: '640px',
        md:'768px',
        lg:'960px',
        xl:'1200px',
        xlg: '1600px'
      },
      colors:{
        primary:"#F59E0B"
      }
    },
  },
  plugins: [],
}