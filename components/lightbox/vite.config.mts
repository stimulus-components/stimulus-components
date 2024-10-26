import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "StimulusLightbox",
      fileName: "stimulus-lightbox",
    },
    rollupOptions: {
      external: ["lightgallery", "@hotwired/stimulus"],
      output: {
        globals: {
          lightgallery: "lightgallery",
          "@hotwired/stimulus": "Stimulus",
        },
      },
    },
  },
})
