import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "StimulusCarousel",
      fileName: "stimulus-carousel",
    },
    rollupOptions: {
      external: ["swiper/bundle", "@hotwired/stimulus"],
      output: {
        globals: {
          "@hotwired/stimulus": "Stimulus",
          "swiper/bundle": "Swiper",
        },
      },
    },
  },
})
