import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxtjs/robots",
    "@nuxtjs/algolia",
    "@nuxtjs/plausible",
    "@nuxtjs/color-mode",
  ],

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  // @ts-expect-error
  colorMode: {
    classSuffix: "",
  },

  content: {
    markdown: {
      anchorLinks: false,
    },
    highlight: {
      theme: "one-dark-pro",
      langs: ["bash", "ruby", "js", "erb", "html", "scss", "css"],
    },
  },

  robots: {
    rules: {
      UserAgent: "*",
      Allow: "/",
    },
  },

  algolia: {
    apiKey: "f9169aa12cc1bb9bcd4b8be214d70922",
    applicationId: "E9IN2DIUM3",
    docSearch: {
      indexName: "stimulus-components",
    },
  },

  compatibilityDate: "2024-10-26",
})
