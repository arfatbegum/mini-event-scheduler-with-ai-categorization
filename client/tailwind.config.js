// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based theming
  theme: {
    extend: {
      colors: {
        // Optional: Define custom colors if needed
        light: {
          background: '#ffffff',
          text: '#1f2937',
        },
        dark: {
          background: '#1f2937',
          text: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}
