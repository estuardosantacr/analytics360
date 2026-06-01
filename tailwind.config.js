/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d2937',
        secondary: '#f39c11',
        brandGreen: '#2dcc70',
        brandTurquoise: '#00c38b',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'whatsapp-pulse': 'whatsapp-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'whatsapp-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(37, 211, 102, 0)' },
        },
      }
    },
  },
  plugins: [],
}
