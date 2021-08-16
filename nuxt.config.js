import { resolve } from 'path'
export default {
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    bodyAttrs: {
      class: 'antialiased'
    }
  },

  loading: {
    color: '#ffcc00',
    height: '2px'
  },

  components: true,

  css: [
  ],

  plugins: [
    '@/plugins/vue-scrollactive'
  ],

  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
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
    parsePages: false,
    lazy: true,
    langDir: 'i18n/',
    vueI18n: {
      fallbackLocale: 'en',
    }
  },

  content: {
    // Disable for security reason on CodeSandBox
    liveEdit: true,
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },

  build: {
    publicPath: 'assets'
  },

  generate: {
    dir: 'dist',
    fallback: '404.html'
  },

  // transition: {
  //   name: 'my-layouts',
  //   mode: 'out-in',
  // },

  // ./assets/img/name.png > ~img/name.png
  alias: {
    'img': resolve(__dirname, './assets/img'),
    'svg': resolve(__dirname, './assets/svg')
  },

  server: {
    port: 3000,
    host: 'localhost',
    timing: false
  }
}
