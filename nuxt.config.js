
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  components: true,
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      {
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
      },
      {
        code: 'ru',
        iso: 'ru-Ru',
        file: 'ru-RU.js',
        name: 'Русский'
      },
      {
        code: 'de',
        iso: 'de-DE',
        file: 'de-DE.js',
        name: 'Deutsh'
      }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'i18n/',
  },
  build: {
  },
  // transition: {
  //   name: 'my-layouts',
  //   mode: 'out-in',
  // },
}
