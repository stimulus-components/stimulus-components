# Changelog

## 5.0.1

### Patch Changes

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

- [#217](https://github.com/stimulus-components/stimulus-components/pull/217) [`e5cddaf`](https://github.com/stimulus-components/stimulus-components/commit/e5cddaf13c1031d3a9a244ff519e319bb69876ab) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Replace the remaining `@ts-expect-error`/`@ts-ignore` comments with real types.

  `EventTarget` casts stand in for the suppressions in `checkbox-select-all`, `dropdown` and `popover`. In `rails-nested-form` and `popover` the honest types surfaced a real `null` case — a remove button outside any wrapper, and a `currentTarget` that has already been cleared — which now returns early instead of raising a `TypeError`.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.0.0] - 2024-03-23

### Added

- Dispatch `rails-nested-form:add` and `rails-nested-form:remove` events.

### Chore

- Renaming the component from `stimulus-rails-nested-form` to `@stimulus-components/rails-nested-form`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [4.1.0] - 2022-12-23

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Using `Stimulus` as external library reducing size from `10.29 KiB` to `0.72 kB`.
- Bump dependencies.
- Upgrading to Vite `4.x`.
- Docs new UI.
- Upgrading Node to `18.x`.

## [4.0.0] - 2021-10-06

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Using default value option for `wrapperSelector`.
- Upgrading dependencies
- Upgrading Node to `14.18.0`

## [3.0.0] - 2021-05-09

### Chore

- Remove puppeteer for Vanilla Jest
- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite)
- Using stimulus as external library reducing bundle size from `40.63kb` to `0.58kb`.
- Moving to TypeScript
- Upgrading Node to 14.16.1

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `values` static property

```diff
- <form data-controller="nested-form" data-nested-form-wrapper-selector=".nested-form-wrapper">
+ <form data-controller="nested-form" data-nested-form-wrapper-selector-value=".nested-form-wrapper">
```

## [1.1.0] - 2020-10-31

## Changed

- Adding `remove` support.

## [1.0.0] - 2020-10-15

### Added

- Adding controller
