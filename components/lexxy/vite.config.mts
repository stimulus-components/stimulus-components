import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "StimulusLexxy",
      fileName: "stimulus-lexxy",
    },
    rollupOptions: {
      external: ["@37signals/lexxy", "@hotwired/stimulus"],
      output: {
        globals: {
          "lexxy": "Lexxy",
          "@hotwired/stimulus": "Stimulus",
        },
      },
    },
  },
})
