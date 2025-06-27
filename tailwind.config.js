/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s ease-out',
        'spin-fast': 'spin 0.5s linear infinite',
        'bounce-in': 'bounceIn 0.6s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'celebration': 'celebration 2s ease-in-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: 0 },
          '50%': { transform: 'scale(1.1)', opacity: 0.8 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        celebration: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
          '25%': { transform: 'scale(1.1) rotate(5deg)', opacity: 0.9 },
          '50%': { transform: 'scale(1.2) rotate(-5deg)', opacity: 0.8 },
          '75%': { transform: 'scale(1.1) rotate(3deg)', opacity: 0.9 },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
        },
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}