# Changelog

## 7.0.0

### Major Changes

- [#220](https://github.com/stimulus-components/stimulus-components/pull/220) [`f0f5f16`](https://github.com/stimulus-components/stimulus-components/commit/f0f5f16ac23e096bc6556cd046467207417f9098) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Update the `swiper` dependency from `^11.0.6` to `^14.0.0`.

  Swiper 11 is affected by [GHSA-hmx5-qpq5-p643](https://github.com/advisories/GHSA-hmx5-qpq5-p643), fixed in Swiper 12.1. The old `^11.0.6` range held consumers on a vulnerable version and blocked them from upgrading Swiper in their own apps.

  The controller itself is unchanged. Swiper 14 is a TypeScript rewrite with no runtime behaviour changes — every option, event, and method signature still behaves as it did in 11, and both `swiper/bundle` and `swiper/types` remain in its `exports` map. The CSS class names (`swiper`, `swiper-wrapper`, `swiper-slide`, …) are the same, so no markup needs to change.

  This is a **major** bump because `swiper` is a runtime dependency and Swiper 14 raises the browser baseline to Chrome/Edge 110+, Safari 16.4+ (iOS 16.4+), and Firefox 110+. Code paths for older browsers were removed upstream. If you need to support browsers below that baseline, stay on `@stimulus-components/carousel@6`, which keeps Swiper 11.

  Note that Swiper has no version 13; upstream skipped it, so 11 → 14 spans two majors.

### Patch Changes

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Fix broken package entrypoints and a wrong exported type.

  - `auto-submit` and `scroll-progress` pointed `types` at a file that was never emitted (their declarations land under `dist/types/components/<name>/src/` because they import the shared `utils/` helpers), so consumers got no types at all.
  - `places-autocomplete` pointed `module` at `dist/stimulus-places-autocomplete.es.js`, a filename Vite no longer emits; it is now `.mjs`.
  - `carousel` typed its `options` value as the Swiper **class** (`import type SwiperOptions from "swiper"` resolves to the default export, not the options interface). It now uses the real `SwiperOptions` from `swiper/types`.

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.0.0] - 2024-02-25

- **Breaking** Upgrading Swiper to `11.x`.
- Renaming the component from `stimulus-carousel` to `@stimulus-components/carousel`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [5.0.1] - 2022-12-27

### Fixed

- Fixing `module` extension in `package.json`.

## [5.0.0] - 2022-12-23

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- **Breaking** Upgrading Swiper to `8.x`.
- Upgrading Vite to `4.x`.
- Updating example UI.
- Upgrading Node to `18`.

## [4.0.0] - 2021-12-27

### Chore

- Breaking Upgrading Stimulus to 3.x and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to `16.13.1`.

## [3.0.0] - 2021-09-24

### Chore

- Upgrade [Swiper](https://swiperjs.com/) to version 7.x.
- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite).
- Using stimulus as external library reducing bundle size from `172.31kb` to `0.63kb`.
- Moving to TypeScript
- Upgrading Node to 14.17.6

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `values` static property

```diff
- <div data-controller="carousel" class="swiper-container" data-carousel-options="{'direction': 'vertical'}">
+ <div data-controller="carousel" class="swiper-container" data-carousel-options-value='{"direction": "vertical"}'>
```

## [1.0.2] - 2020-11-13

### Changed

- Don't import css in the js file.

## [1.0.1] - 2020-11-12

### Changed

- Destroy the `swiper` instance on disconnect.

## [1.0.0] - 2020-11-11

### Added

- Adding controller
