# Changelog

## 0.5.1

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

## [0.5.0] - 2022-05-02

### Chore

- **Breaking** Upgrading `Stimulus` to 3.x and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to 16

## [0.4.0] - 2021-05-25

### Added

- Adding country restriction support.

### Changed

- Reset fields if address type is undefined.

## [0.3.0] - 2021-05-21

### Added

- Adding support for `latitude` and `longitude`.

## [0.2.0] - 2021-05-12

### Changed

- Adding method `preventSubmit`.

## [0.1.0] - 2021-05-11

### Added

- Adding controller
