# Changelog

## 4.0.1

### Patch Changes

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

- [#212](https://github.com/stimulus-components/stimulus-components/pull/212) [`e75391e`](https://github.com/stimulus-components/stimulus-components/commit/e75391e7569bc42fcda2d2eb82f3533ebfea7678) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Disconnect the IntersectionObserver when the controller disconnects.

  `load()` kept its observer in a local `const` and only unobserved from inside the callback, so a link removed before it ever scrolled into view left the observer — and through it the controller and the detached link — alive. This mirrors the `content-loader` fix in [#207](https://github.com/stimulus-components/stimulus-components/issues/207).

  This adds the package's first spec.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.0] - 2024-03-17

### Chore

- Renaming the component from `stimulus-prefetch` to `@stimulus-components/prefetch`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [3.1.0] - 2022-12-23

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Changed

- Only prefetch when connection effectiveType is `4g`. See: https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType.

### Chore

- Using `Stimulus` as external library reducing size from `10.78 KiB` to `1.13 kB`.
- Bump dependencies.
- Upgrading to Vite `4.x`.
- Docs new UI.
- Upgrading Node to `18.x`.

## [3.0.0] - 2021-09-29

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to `14.18.0`
- Using stimulus as external library.

## [2.0.0] - 2021-05-17

### Chore

- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite)
- Upgrading Node to 14.16.1
- Moving to TypeScript

## [1.0.1] - 2020-12-14

### Changed

- Use `console.warn` instead of `console.error` if using 2G or if Save-Data is enabled.

## [1.0.0] - 2020-12-06

### Added

- Adding controller
