/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        school: {
          50: '#e8f0ed',
          100: '#d4e3dd',
          200: '#a8c4b8',
          300: '#6f9a89',
          400: '#3d7362',
          500: '#0a5c47',
          600: '#032f23',
          700: '#054433',
          800: '#032f23',
          900: '#021f18',
          950: '#021910',
        },
        primary: {
          DEFAULT: '#032f23',
          hover: '#054433',
          light: '#0a5c47',
        },
        secondary: {
          DEFAULT: '#054433',
        },
        gold: {
          400: '#3d7362',
          500: '#0a5c47',
          600: '#054433',
          700: '#032f23',
        },
        surface: '#e8f0ed',
        charcoal: '#17202A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 12px 0 rgba(3, 47, 35, 0.06)',
        'card': '0 6px 16px 0 rgba(3, 47, 35, 0.08)',
        'card-hover': '0 12px 24px 0 rgba(3, 47, 35, 0.12)',
      },
    },
  },
  plugins: [],
}
