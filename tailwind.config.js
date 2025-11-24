/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgb(var(--color-accent) / 0.5)',
        'glow-lg': '0 0 30px -5px rgb(var(--color-accent) / 0.6)',
      },
    },
  },
  plugins: [],
}
