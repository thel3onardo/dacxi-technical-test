import { Config } from 'tailwindcss'

export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#AA69FF',
        light: '#e0e0e0',
        surface: '#000005'
      }
    }
  },
  plugins: []
} satisfies Config
