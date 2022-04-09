const title = 'Stimulus Components'
const description = 'Simple and powerful Stimulus JS library for common JavaScript behavior.'

export default {
  target: 'static',

  head: {
    title,
    titleTemplate: '%s | Stimulus Components',
    htmlAttrs: {
      lang: 'en',
    },
    link: [
      { rel: 'preconnect', href: 'https://e9in2dium3-dsn.algolia.net' },
      { rel: 'preconnect', href: 'https://img.shields.io' },
      { rel: 'preconnect', href: 'https://github.com' },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'author', content: 'guillaumebriday' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      {
        property: 'og:image',
        content: 'https://raw.githubusercontent.com/stimulus-components/stimulus-components/master/screenshot.png',
      },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:creator', content: '@guillaumebriday' },
    ],
  },

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@nuxtjs/google-analytics'],

  modules: ['@nuxt/content', '@nuxtjs/robots'],

  css: ['@docsearch/css'],

  googleAnalytics: {
    id: 'UA-54003772-15',
  },

  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-one-light.css',
      },
    },
  },

  build: {
    extractCSS: true,
  },

  robots: {
    UserAgent: '*',
    Allow: '/',
  },

  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()

      return files.map((file) => (file.path === '/index' ? '/' : file.path))
    },
  },

  publicRuntimeConfig: {
    algoliaAppId: 'E9IN2DIUM3',
    algoliaApiKey: 'f9169aa12cc1bb9bcd4b8be214d70922',
    algoliaIndexName: 'stimulus-components',
  },
}
