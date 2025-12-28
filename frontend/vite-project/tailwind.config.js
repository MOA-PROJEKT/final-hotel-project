/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Standard-Schrift im ganzen Projekt
        sans: ['HotelDisplay', 'system-ui', 'sans-serif'],

        // falls du irgendwo extra "font-display" benutzt
        display: ['HotelDisplay', 'serif'],
      },
    },
  },
  plugins: [],
}
