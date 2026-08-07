import { defineNuxtConfig } from "nuxt/config"
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/robots", "@nuxtjs/algolia", "@nuxtjs/plausible", "@nuxtjs/color-mode"],

  css: ["~/assets/css/tailwind.css"],

  vite: {
    // @ts-expect-error pnpm installs vite under several peer-suffixed paths, so the
    // Plugin type @tailwindcss/vite is built against is structurally identical to,
    // but nominally distinct from, the one Nuxt's config expects. Runtime is fine.
    plugins: tailwindcss(),

    server: {
      watch: {
        usePolling: true,
      },
    },
  },

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
