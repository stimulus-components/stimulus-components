# Changelog

## 5.0.1

### Patch Changes

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Fix broken package entrypoints and a wrong exported type.

  - `auto-submit` and `scroll-progress` pointed `types` at a file that was never emitted (their declarations land under `dist/types/components/<name>/src/` because they import the shared `utils/` helpers), so consumers got no types at all.
  - `places-autocomplete` pointed `module` at `dist/stimulus-places-autocomplete.es.js`, a filename Vite no longer emits; it is now `.mjs`.
  - `carousel` typed its `options` value as the Swiper **class** (`import type SwiperOptions from "swiper"` resolves to the default export, not the options interface). It now uses the real `SwiperOptions` from `swiper/types`.

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

- [#210](https://github.com/stimulus-components/stimulus-components/pull/210) [`5c41f7b`](https://github.com/stimulus-components/stimulus-components/commit/5c41f7bc54f3dd4142642b844101a7bbb4303b42) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Throttle `scroll` once instead of re-wrapping it on every connect.

  `connect()` wrapped `this.scroll` in a fresh throttle every time it ran, and Stimulus reuses the controller instance when the same element leaves and re-enters the DOM. Each cycle stacked another layer, and every layer schedules its own timer on every scroll event, so a page that reconnects the bar repeatedly ends up doing that work N times per scroll. The wrapping now happens once, in `initialize()`.

  This also adds the package's first spec.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.0.0] - 2024-03-17

### Chore

- Renaming the component from `stimulus-scroll-progress` to `@stimulus-components/scroll-progress`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [4.2.0] - 2023-12-24

### Chore

- Bump dependencies.
- Upgrading to Vite `5.x`.
- Using a `throttle` function without `lodash.throttle`.

## [4.1.0] - 2022-12-25

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Bump dependencies.
- Upgrading to Vite `4.x`.
- Docs new UI.
- Upgrading Node to `18.x`.

## [4.0.0] - 2021-11-13

### Chore

- Breaking Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to 14.18.1

## [3.0.0] - 2021-05-25

### Chore

- Moving from Snowpack to Vite
- Using stimulus and lodash.throttle as external libraries reducing bundle size from `109.79kb` to `0.54kb`.
- Moving to TypeScript
- Upgrading Node to 14.17.0

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `values` static property

```diff
- <div data-controller="scroll-progress" data-scroll-progress-throttle-delay="100">
+ <div data-controller="scroll-progress" data-scroll-progress-throttle-delay-value="100">
```

## [1.0.1] - 2020-11-11

### Changed

- Removing console.log

## [1.0.0] - 2020-11-11

### Added

- Adding controller
