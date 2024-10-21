import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => {
  if (mode === "netlify") {
    return {}
  }

  return {
    esbuild: {
      minifyIdentifiers: false,
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "StimulusTimeago",
        fileName: "stimulus-timeago",
      },
      rollupOptions: {
        external: ["date-fns", "@hotwired/stimulus"],
        output: {
          globals: {
            "@hotwired/stimulus": "Stimulus",
            "date-fns": "dateFns",
          },
        },
      },
    },
  }
})
