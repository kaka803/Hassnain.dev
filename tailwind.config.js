/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",    // App Router
    "./pages/**/*.{js,ts,jsx,tsx}",  // Page Router
    "./components/**/*.{js,ts,jsx,tsx}", // Components
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#6D28D9", // Example
      },
    },
  },
  plugins: [],
}
