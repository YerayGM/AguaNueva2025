/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verdeCabildo: {
          DEFAULT: 'var(--color-verdeCabildo)',
          hover: 'var(--color-verdeCabildo-hover)',
        },
      },
    },
  },
  plugins: [],
}