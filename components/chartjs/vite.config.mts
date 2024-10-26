import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "StimulusChartjs",
      fileName: "stimulus-chartjs",
    },
    rollupOptions: {
      external: ["chart.js/auto", "@hotwired/stimulus"],
      output: {
        globals: {
          "chart.js/auto": "Chart",
          "@hotwired/stimulus": "Stimulus",
        },
      },
    },
  },
})
