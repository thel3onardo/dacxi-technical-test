import { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

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
      },
      fontFamily: {
        sans: ['Lexend', ...defaultTheme.fontFamily.sans],
        'dm-sans': ['DM Sans', 'sans-serif']
      },
      maxWidth: {
        content: '1000px'
      }
    }
  }
} satisfies Config
