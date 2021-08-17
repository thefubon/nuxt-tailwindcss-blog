// Alias Component
import { resolve } from 'path'

// Acticles Components
import global from './utils/global';
import getRoutes from './utils/getRoutes';
import getSiteMeta from './utils/getSiteMeta';

const meta = getSiteMeta();

export default {
  target: 'static',

  head: {
    title: 'Nuxt Components',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      ...meta,
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: global.siteDesc || '',
      },
      { property: 'og:site_name', content: global.siteName || '' },
      {
        hid: 'description',
        name: 'description',
        content: global.siteDesc || '',
      },
      { property: 'og:image:width', content: '740' },
      { property: 'og:image:height', content: '300' },
      { name: 'twitter:site', content: global.siteName || '' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: global.siteUrl,
      },
    ],
    bodyAttrs: {
      class: 'antialiased'
    }
  },

  loading: {
    color: '#ffcc00',
    height: '2px'
  },

  // ./assets/img/name.png > ~img/name.png
  alias: {
    'img': resolve(__dirname, './assets/img'),
    'svg': resolve(__dirname, './assets/svg')
  },

  components: true,

  css: [
  ],

  plugins: [
    '@/plugins/vue-scrollactive',
    '~/plugins/contentful',
  ],

  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit'
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

  content: {
    // Disable for security reason on CodeSandBox
    liveEdit: true,
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },

  markdownit: {
    injected: true
  },

  build: {
    publicPath: 'assets',
  },

  generate: {
    dir: 'dist',
    fallback: '404.html'
  },

  // Sitemap Configuration (https://github.com/nuxt-community/sitemap-module)
  sitemap: {
    hostname: global.siteUrl,
    routes() {
      return getRoutes();
    },
  },

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

  transition: {
    name: 'my-layouts',
    mode: 'out-in',
  }
}
