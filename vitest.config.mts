import { defaultExclude, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    // Agent worktrees under .claude/ are full copies of the repo, so their specs
    // would otherwise be collected and run a second time.
    exclude: [...defaultExclude, "**/.claude/worktrees/**"],
  },
})
