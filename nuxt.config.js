/* options */

const mode = 'universal'; // universal/spa
const serveFromSubFolder = false;

/* options end */

const pkg = require('./package');
const path = require('path');

let dist = '';
if (mode === 'universal') {
  dist = 'scutum-universal'
} else {
  dist = 'scutum-spa'
}

module.exports = {
  mode: mode,
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Image Gallery App',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    script: [{
      src: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/vendor/uikit.min.js'
    }],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/favicon.ico'
      },
      {
        rel: 'preload',
        href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/vendor/uikit.min.js',
        as: 'script'
      },
      {
        rel: 'preload',
        href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css',
        as: 'style'
      },
      {
        rel: 'preload',
        href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css',
        as: 'style'
      },
      {
        rel: 'preload',
        href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/mdi_base64.css',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css'
      },
      {
        rel: 'stylesheet',
        href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css'
      },
      {
        rel: 'stylesheet',
        href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/mdi_base64.css'
      }
    ]
  },
  layoutTransition: 'none',
  pageTransition: 'none',
  loading: '~/components/progress/components/AppLoader.vue',
  loadingIndicator: '~/components/progress/components/AppLoader.vue',
  /*
   ** Global CSS
   */
  css: [
    'uikit/dist/css/uikit.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '~/plugins/axios'
    },
    {
      src: '~/plugins/components.global.js'
    },
    {
      src: '~/plugins/directives.client.js'
    },
    {
      src: '~/plugins/mixins.client.js'
    },
    {
      src: '~/plugins/vueVisible.client.js'
    }
  ],
  router: {
    middleware: ['redirect'],
    base: process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '/' : '/' + dist
  },
  modules: [
    '@nuxtjs/axios',
    'nuxt-socket-io'
    // '@nuxtjs/webpack-profile'
  ],
  axios: {
    // proxyHeaders: false
    baseURL: process.env.NODE_ENV == 'production' ? "https://dashboard.productionurl.com" : "http://localhost:8099",
    progress: true,
    credentials: true
  },
  generate: {
    dir: dist
  },
  /*
   ** Build configuration
   */
  build: {
    // analyze: true,
    progress: true,
    babel: {
      babelrc: true,
      presets({
        isServer
      }) {
        return [
          [require.resolve('@nuxt/babel-preset-app'), {
            targets: isServer ?
              {
                node: "current"
              } :
              {
                browsers: ["last 2 versions"],
                ie: 11
              },
            debug: false
          }]
        ]
      }
    },
    extend(config, ctx) {
      // aliases
      config.resolve.alias['scss'] = path.resolve(__dirname, './assets/scss');
      // adjust path when serving app from sub-folder
      if (!ctx.isDev && serveFromSubFolder) {
        config.output.publicPath = '/' + dist + '/_nuxt/';
      }
      return config;
    }
  }
};
