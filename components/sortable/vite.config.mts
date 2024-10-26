import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "StimulusSortable",
      fileName: "stimulus-sortable",
    },
    rollupOptions: {
      external: ["@rails/request.js", "sortablejs", "@hotwired/stimulus"],
      output: {
        globals: {
          "@rails/request.js": "Request.js",
          sortablejs: "Sortable",
          "@hotwired/stimulus": "Stimulus",
        },
      },
    },
  },
})
