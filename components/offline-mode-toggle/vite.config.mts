import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "OfflineModeToggle",
      fileName: "offline-mode-toggle",
    },
    rollupOptions: {
      external: ["stimulus-use", "@hotwired/stimulus"],
      output: {
        globals: {
          "stimulus-use": "useTransition",
          "@hotwired/stimulus": "Stimulus",
        },
      },
    },
  },
})
