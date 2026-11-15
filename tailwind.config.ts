import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          base: '#07100F',
          surface: '#0D1816',
          elevated: '#111E1B',
          border: '#21312D',
          borderLight: '#2A3F3A',
        },
        fcText: {
          primary: '#EFF5ED',
          secondary: '#93A39C',
          muted: '#687771',
        },
        lime: {
          brand: '#B8EE68',
          hover: '#CBF58C',
          muted: '#84AD47',
        },
        sensor: {
          modis: '#68D9D0',
          viirs: '#FF9C55',
          high: '#FF6759',
          warm: '#FFA64D',
          mild: '#3D786E',
          minimum: '#4FA89B',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        title: ['"Manrope"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'spin-slow': 'spin 40s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
