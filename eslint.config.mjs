import { createConfigForNuxt } from "@nuxt/eslint-config/flat"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

// Flat config (ESLint 9). Prettier owns formatting, so Nuxt's stylistic rules stay off.
export default createConfigForNuxt({
  features: {
    stylistic: false,
  },
})
  .append({
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-reserved-component-names": "off",
      "vue/no-v-html": "off",
      // Controllers intentionally use `// @ts-expect-error` / `// @ts-ignore` to bridge
      // untyped third-party libraries; don't fail the build on them.
      "@typescript-eslint/ban-ts-comment": "off",
    },
  })
  .append(eslintPluginPrettierRecommended)
  .append({
    ignores: ["**/dist/**", "**/.nuxt/**", "**/.output/**", "**/node_modules/**", "pnpm-lock.yaml"],
  })
