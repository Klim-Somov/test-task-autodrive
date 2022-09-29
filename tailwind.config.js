/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color3B82F6: "#3B82F6",
        color0D9488: "#0D9488",
        color6b7280bf: "#6b7280bf",
      },
    },
  },
  plugins: [],
}
