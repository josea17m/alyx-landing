/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#863bff',
          dark: '#6d22e8',
          light: '#a76bff',
          soft: '#f3ebff',
        },
        square: {
          DEFAULT: '#006AFF',
          dark: '#0052cc',
          soft: '#e6f0ff',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
