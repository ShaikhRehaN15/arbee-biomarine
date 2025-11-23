module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': {'raw':'(max-width:375px)'}, // or whatever min-width you prefer for 'xs'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  experimental: {
    containerQuery: true,
  },
}
