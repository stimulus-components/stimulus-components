import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/algolia',
    '@nuxtjs/plausible',
    '@nuxtjs/color-mode',
  ],

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  colorMode: {
    classSuffix: '',
  },

  content: {
    markdown: {
      anchorLinks: false,
    },
    highlight: {
      theme: 'one-dark-pro',
    },
  },

  robots: {
    rules: {
      UserAgent: '*',
      Allow: '/',
    },
  },

  algolia: {
    apiKey: 'f9169aa12cc1bb9bcd4b8be214d70922',
    applicationId: 'E9IN2DIUM3',
    docSearch: {
      indexName: 'stimulus-components',
    },
  },
})
