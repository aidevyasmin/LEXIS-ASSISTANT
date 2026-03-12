/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          dark: '#0a0a0c', // Professional dark
          gold: '#c5a059', // Legal gold
          navy: '#1a2a44', // Professional navy
          gray: '#2d2d2d',
        }
      }
    },
  },
  plugins: [],
}
