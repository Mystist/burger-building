/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tasty": '#EBA337',
      },
      scale: {
        '175': '1.75',
        '200': '2',
      }
    },
  },
  plugins: [],
}
