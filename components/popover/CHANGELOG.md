# Changelog

## 7.0.1

### Patch Changes

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

- [#217](https://github.com/stimulus-components/stimulus-components/pull/217) [`e5cddaf`](https://github.com/stimulus-components/stimulus-components/commit/e5cddaf13c1031d3a9a244ff519e319bb69876ab) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Replace the remaining `@ts-expect-error`/`@ts-ignore` comments with real types.

  `EventTarget` casts stand in for the suppressions in `checkbox-select-all`, `dropdown` and `popover`. In `rails-nested-form` and `popover` the honest types surfaced a real `null` case — a remove button outside any wrapper, and a `currentTarget` that has already been cleared — which now returns early instead of raising a `TypeError`.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [7.0.0] - 2024-03-17

### Chore

- Renaming the component from `stimulus-popover` to `@stimulus-components/popover`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [6.2.0] - 2022-12-23

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Bump dependencies.
- Upgrading to Vite `4.x`.
- Docs new UI.

## [6.1.0] - 2022-08-12

### Chore

- Using `mouseenter` and `mouseleave` events
- Fix error when target is null

## [6.0.0] - 2022-08-12

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to 16
- Updating Workflows

## [5.0.1] - 2021-06-14

### Fixed

- Using `currentTarget` instead of `target` to select the element.

## [5.0.0] - 2021-06-02

### Chore

- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://vitejs.dev/)
- Using stimulus as external library reducing bundle size from `40.66kb` to `0.61kb`.
- Moving to [TypeScript](https://www.typescriptlang.org/).
- Upgrading Node to 14.17.0

## [4.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0
- Prevent error if the url is empty when using remote card.

### Changed

- **Breaking** Using the new `values` static property

```diff
- <div data-controller="popover" data-popover-url="/card.html">
+ <div data-controller="popover" data-popover-url-value="/card.html">
```

- **Breaking** Using the new syntax for `targets`.

```diff
- <div data-controller="popover" data-target="popover.card">
+ <div data-controller="popover" data-popover-target="card">
```

## [3.0.0] - 2020-11-18

### Changed

**Breaking** - Removing Tippy as dependency.
**Breaking** - Rename `mouseOver` to `show`.

### Added

- Add `hide` action.

## [2.0.0] - 2020-11-10

### Added

- Adding `tippyOptions` getter to simply override default options.
- `tippy` instance is now a singleton.
- Destroy `tippy` instance on disconnect.

### Changed

**Breaking** - Removing `mouseOut` action.
**Breaking** - `popover` action does not return a new `tippy` instance.

## [1.0.0] - 2020-10-20

### Added

- Adding controller
