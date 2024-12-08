import typography from "@tailwindcss/typography"
import type { PluginAPI } from "tailwindcss/types/config"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#383241",
        secondary: "#FFD99C",
        "text-secondary": "#8B89A9",
        tertiary: "#B1FFBE",
        "surface-primary": "#D0CEFD",
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
  plugins: [typography],
}
