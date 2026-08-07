import { defaultExclude, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    // Every spec drives a Stimulus Application against a real DOM.
    //
    // This only applies when Vitest resolves *this* config, i.e. when run from
    // the repo root. Running it from inside `components/<name>/` resolves that
    // package's `vite.config.mts` instead, which knows nothing about tests — so
    // each spec also carries its own `@vitest-environment jsdom` docblock.
    // Both are needed; neither is redundant.
    environment: "jsdom",

    // Agent worktrees under .claude/ are full copies of the repo, so their specs
    // would otherwise be collected and run a second time.
    exclude: [...defaultExclude, "**/.claude/worktrees/**"],
  },
})
