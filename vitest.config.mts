import { defaultExclude, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    // Every spec drives a Stimulus Application against a real DOM.
    environment: "jsdom",

    // Agent worktrees under .claude/ are full copies of the repo, so their specs
    // would otherwise be collected and run a second time.
    exclude: [...defaultExclude, "**/.claude/worktrees/**"],
  },
})
