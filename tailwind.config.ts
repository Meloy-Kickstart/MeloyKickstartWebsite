import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Texas A&M inspired electric maroon and violet accents
        maroon: {
          600: '#7a0026',
          700: '#5a001c',
          neon: '#d40057', // electric maroon glow
        },
        violet: {
          neon: '#9b5cff',
          600: '#7c3aed',
        },
        surface: {
          900: '#0b0b0f',
          800: '#111118',
          700: '#161624',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        futuristic: ['Orbitron', 'Space Grotesk', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 20px rgba(155,92,255,0.45), 0 0 40px rgba(212,0,87,0.25)',
        innerglass: 'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.35)'
      },
      backdropBlur: {
        xs: '2px'
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(1000px 600px at 120% -10%, rgba(155,92,255,.15), transparent 60%), radial-gradient(800px 500px at -20% 120%, rgba(212,0,87,.12), transparent 60%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
      },
      animation: {
        'slow-pan': 'slow-pan 25s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite'
      },
      keyframes: {
        'slow-pan': {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 0%' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 rgba(155,92,255,0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(155,92,255,0.45)' }
        }
      }
    },
  },
  plugins: [],
} satisfies Config
