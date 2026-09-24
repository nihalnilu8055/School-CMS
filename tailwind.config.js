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
          50: '#F5F8FC',
          100: '#E8F0F8',
          200: '#CBE0F0',
          300: '#94C0E0',
          400: '#4A90C2',
          500: '#1F5F8B', // Secondary Professional Blue
          600: '#16486E',
          700: '#12355B', // Primary Deep Academic Navy
          800: '#0D2A47', // Hover Dark Navy
          900: '#091E33',
          950: '#051220',
        },
        primary: {
          DEFAULT: '#12355B',
          hover: '#0D2A47',
          light: '#1F5F8B',
        },
        secondary: {
          DEFAULT: '#1F5F8B',
        },
        gold: {
          400: '#D4B342',
          500: '#C9A227', // Accent Elegant Academic Gold
          600: '#B08C1E',
          700: '#8A6D14',
        },
        surface: '#F5F8FC',
        charcoal: '#17202A',
        slate: {
          50: '#F8FAFC',
          100: '#F5F8FC',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#5B6775', // Muted Slate Gray
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#17202A', // Main Text Dark Charcoal
          950: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 12px 0 rgba(18, 53, 91, 0.05)',
        'card': '0 6px 16px 0 rgba(18, 53, 91, 0.08)',
        'card-hover': '0 12px 24px 0 rgba(18, 53, 91, 0.12)',
      },
    },
  },
  plugins: [],
}
