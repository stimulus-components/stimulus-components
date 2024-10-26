import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "StimulusTextareaAutogrow",
      fileName: "stimulus-textarea-autogrow",
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
})
