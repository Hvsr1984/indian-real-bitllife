/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf0',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        luxury: {
          bg: '#f6f7fb',
          card: '#ffffff',
          panel: '#fafafc',
          border: '#e2e3eb',
          goldText: '#ab811a',
          goldBorder: '#c2a14e',
          goldGlow: 'rgba(171, 129, 26, 0.08)',
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ab811a 0%, #ecd07f 25%, #bf953f 50%, #fbf5b7 75%, #855d0a 100%)',
        'dark-gradient': 'linear-gradient(180deg, #ffffff 0%, #f6f7fb 100%)',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-slow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.1), 0 0 10px rgba(212, 175, 55, 0.05)' },
          '100%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.3), 0 0 25px rgba(212, 175, 55, 0.15)' }
        }
      }
    },
  },
  plugins: [],
}
