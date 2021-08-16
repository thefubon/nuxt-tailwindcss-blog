const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './content/**/*.md',
     './layouts/**/*.vue',
     './pages/**/*.vue',
     './plugins/**/*.{js,ts}',
     './nuxt.config.{js,ts}',
   ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#F97316'
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
