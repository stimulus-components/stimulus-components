import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"
import typography from "@tailwindcss/typography"
import type { PluginAPI } from "tailwindcss/types/config"
import plugin from "tailwindcss/plugin"

export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#383241",
          dark: colors.slate["200"],
        },
        secondary: {
          DEFAULT: "#FFD99C",
          dark: "#FFD99C",
        },
        "text-secondary": {
          DEFAULT: "#8B89A9",
          dark: "#D0CEFD",
        },
        tertiary: {
          DEFAULT: "#B1FFBE",
        },
        "surface-primary": {
          DEFAULT: "#D0CEFD",
          dark: colors.slate["900"],
        },
      },
      typography: (theme: PluginAPI["theme"]) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.orange.500"),
              "&:hover": {
                color: theme("colors.orange.700"),
              },
            },
            code: {
              color: theme("colors.gray.500"),
              backgroundColor: theme("colors.gray.100"),
              fontWeight: theme("fontWeight.normal"),
              borderRadius: theme("borderRadius.md"),
              paddingLeft: theme("spacing.1"),
              paddingRight: theme("spacing.1"),
              paddingTop: theme("spacing[0.5]"),
              paddingBottom: theme("spacing[0.5]"),
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
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
