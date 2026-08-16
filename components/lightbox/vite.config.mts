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
      external: ["photoswipe", "photoswipe/lightbox", "@hotwired/stimulus"],
      output: {
        globals: {
          photoswipe: "PhotoSwipe",
          "photoswipe/lightbox": "PhotoSwipeLightbox",
          "@hotwired/stimulus": "Stimulus",
        },
      },
    },
  },
})
