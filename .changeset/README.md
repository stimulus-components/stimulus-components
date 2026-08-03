# Changesets

This folder is managed by [changesets](https://github.com/changesets/changesets). Each `*.md`
file here describes a pending change to one or more component packages and the semver bump it
warrants.

## Adding a changeset

When you change a published component, run:

```bash
pnpm changeset
```

Pick the affected package(s), choose `patch` / `minor` / `major`, and write a short summary. Commit
the generated file alongside your code change.

## How a release happens

On merge to `master`, the **Release** GitHub Action opens (or updates) a "Version Packages" PR that
consumes the pending changesets, bumps versions, and updates each package's `CHANGELOG.md`. Merging
that PR publishes the bumped packages to npm (with provenance).

See https://github.com/changesets/changesets for the full docs.
