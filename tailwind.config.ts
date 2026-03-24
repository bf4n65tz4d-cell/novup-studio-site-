import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:     '#FFF7ED',
        'bg-warm': '#F5EDE0',
        dark:   '#18181B',
        'dark-dk': '#100D0A',
        orange: '#F97316',
        'orange-dk': '#EA580C',
      },
      fontFamily: {
        syne:  ['var(--font-syne)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
