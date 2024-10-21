import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => {
  if (mode === "netlify") {
    return {}
  }

  return {
    esbuild: {
      minifyIdentifiers: false,
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "StimulusScrollReveal",
        fileName: "stimulus-scroll-reveal",
      },
      rollupOptions: {
        external: ["@hotwired/stimulus"],
        output: {
          globals: {
            "@hotwired/stimulus": "Stimulus",
          },
        },
      },
    },
  }
})
