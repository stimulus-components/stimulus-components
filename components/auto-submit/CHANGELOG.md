# Changelog

## 6.0.1

### Patch Changes

- [#209](https://github.com/stimulus-components/stimulus-components/pull/209) [`8538e3a`](https://github.com/stimulus-components/stimulus-components/commit/8538e3a8666a0151bb4aba43760c279627b2989d) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Debounce `submit` once instead of re-wrapping it on every connect.

  `connect()` wrapped `this.submit` in a fresh debounce every time it ran, and Stimulus reuses the controller instance when the same element leaves and re-enters the DOM (a Turbo cache restore, a form moved around the page). Every cycle added another layer, so the effective delay grew to N × `delayValue`. The wrapping now happens once, in `initialize()`.

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Fix broken package entrypoints and a wrong exported type.

  - `auto-submit` and `scroll-progress` pointed `types` at a file that was never emitted (their declarations land under `dist/types/components/<name>/src/` because they import the shared `utils/` helpers), so consumers got no types at all.
  - `places-autocomplete` pointed `module` at `dist/stimulus-places-autocomplete.es.js`, a filename Vite no longer emits; it is now `.mjs`.
  - `carousel` typed its `options` value as the Swiper **class** (`import type SwiperOptions from "swiper"` resolves to the default export, not the options interface). It now uses the real `SwiperOptions` from `swiper/types`.

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.0.0] - 2024-03-23

### Chore

- **Breaking** Rename the `save` method to `submit`.

```diff
- <%= f.text_field :description, data: { action: 'keyup->auto-submit#save' } %>
+ <%= f.text_field :description, data: { action: 'keyup->auto-submit#submit' } %>
```

- Renaming the component from `stimulus-rails-autosave` to `@stimulus-components/auto-submit`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [5.1.0] - 2023-12-25

### Chore

- Adding interactive example
- Using a `debounce` function without `lodash.debounce`.

## [5.0.1] - 2023-12-02

### Chore

- Fixing module exports

## [5.0.0] - 2023-12-02

### Chore

- **Breaking** Remove `@rails/ujs` support. Migrate to Turbo.
- Change the default `delay` option from `0` to `150`.
- Upgrading dependencies

## [4.1.1] - 2022-11-06

- Removing `@rails/ujs` from dependencies. Making `@rails/ujs` completely optional.

## [4.1.0] - 2022-11-06

### Chore

- Upgrading to node 18
- Upgrading dependencies
- Using `lodash.debounce` instead of `lodash`
- Using `requestSubmit` if `@rails/ujs` is not detected, so we can use this package without Rails-ujs at all.

## [4.0.0] - 2021-09-29

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading to node `14.18.0`
- Upgrading dependencies

## [3.0.0] - 2021-05-31

### Chore

- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite).
- Using stimulus as external library reducing bundle size from `122.96kb` to `0.33kb`.
- Moving to [TypeScript](https://www.typescriptlang.org/).
- Upgrading Node to 14.17.0

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `values` static property

```diff
- <%= form_with model: @todo, data: { controller: 'autosave', autosave_delay: '1000' } do |f| %>
+ <%= form_with model: @todo, data: { controller: 'autosave', autosave_delay_value: 1000 } do |f| %>
```

## [1.0.0] - 2020-11-13

### Added

- Adding controller
