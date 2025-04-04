/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "fresh-green": "#E74c3c",
        "starbucks": '#006241'
      },
      fontFamily:
      {
        "logo": "Dancing Script"
      }
    },
  },
  plugins: [],
}