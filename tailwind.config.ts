import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        card: 'var(--color-card)',
        accent: 'var(--color-accent)',
        primary: 'var(--color-primary)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Clash Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config