import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "StimulusColorPicker",
      fileName: "stimulus-color-picker",
    },
    rollupOptions: {
      external: ["@simonwep/pickr", "@hotwired/stimulus"],
      output: {
        globals: {
          "@simonwep/pickr": "Pickr",
          "@hotwired/stimulus": "Stimulus",
        },
      },
    },
  },
})
