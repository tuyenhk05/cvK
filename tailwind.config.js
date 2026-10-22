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
        cyber: {
          bg: '#0a0e17',
          card: '#111827',
          surface: '#151d2e',
          accent: '#00f2fe',
          cyan: '#38bdf8',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          amber: '#f59e0b',
          emerald: '#10b981',
          danger: '#ef4444',
          border: 'rgba(56, 189, 248, 0.2)',
          glow: 'rgba(0, 242, 254, 0.35)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(0, 242, 254, 0.2), 0 0 20px rgba(0, 242, 254, 0.1)' },
          'to': { boxShadow: '0 0 25px rgba(0, 242, 254, 0.6), 0 0 45px rgba(0, 242, 254, 0.3)' },
        }
      }
    },
  },
  plugins: [],
}
