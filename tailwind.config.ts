import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2.5rem',
      },
    },
    extend: {
      colors: {
        // Brand palette pulled from the 2026 exec-team graphics
        cream: '#faf6f0',
        ink: '#4a0a18',
        maroon: {
          DEFAULT: '#5c0f1f',
          600: '#7a1e32',
          500: '#8c3a4e',
        },
        rose: {
          DEFAULT: '#a64b63',
          300: '#c98a9b',
          200: '#e8c9cf',
          100: '#f1dde1',
          50: '#f7ecee',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid display sizes: scale between phone and desktop without breakpoints
        'display-xl': ['clamp(2.75rem, 9vw, 7rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 6vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        label: '0.28em',
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        frame: '0 0 0 2px #5c0f1f',
        lift: '0 12px 32px -16px rgba(92, 15, 31, 0.35)',
      },
    },
  },
  plugins: [],
} satisfies Config
