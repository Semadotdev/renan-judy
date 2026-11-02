/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        wide: '1440px',
      },
      colors: {
        milk: '#FBF7F4',
        oat: '#E5DED2',
        taupe: '#A39382',
        mocha: '#685D54',
        charcoal: '#232323',
      },
      fontFamily: {
        display: ['Bodoni Moda', 'Georgia', 'serif'],
        body: ['Cormorant Garamond', 'Georgia', 'serif'],
        script: ['Great Vibes', 'cursive'],
        sans: ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 30px 90px rgba(12, 11, 10, 0.18)',
        cinematic: '0 40px 120px rgba(0, 0, 0, 0.45)',
        glow: '0 0 90px rgba(229, 222, 210, 0.22)',
      },
      letterSpacing: {
        cinema: '0.32em',
        wide: '0.18em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        drift: 'drift 24s linear infinite',
        shimmer: 'shimmer 5s ease-in-out infinite',
        equalize: 'equalize 0.9s ease-in-out infinite alternate',
        'pulse-soft': 'pulseSoft 5s ease-in-out infinite',
        'slow-spin': 'spin 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        drift: {
          '0%': { transform: 'translateX(-8vw)' },
          '100%': { transform: 'translateX(108vw)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.8' },
        },
        equalize: {
          '0%': { transform: 'scaleY(0.35)' },
          '100%': { transform: 'scaleY(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
}
