import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],

  plugins: [
    plugin(
      ({ addVariant }) => {
        addVariant("glow", ".glow-capture .glow-overlay &")
      },
      {
        theme: {
          extend: {
            colors: {
              glow: "color-mix(in srgb, var(--glow-color) calc(<alpha-value> * 100%), transparent)",
            },
          },
        },
      },
    ),
  ],
} satisfies Config
