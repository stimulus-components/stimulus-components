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
      external: ["chart.js", "@hotwired/stimulus"],
      output: {
        globals: {
          "chart.js": "Chart",
          "@hotwired/stimulus": "Stimulus",
        },
      },
    },
  },
})
