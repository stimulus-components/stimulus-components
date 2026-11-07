# Changelog

## 5.0.1

### Patch Changes

- [#211](https://github.com/stimulus-components/stimulus-components/pull/211) [`a9e90e8`](https://github.com/stimulus-components/stimulus-components/commit/a9e90e8f36ad9d0ba408c1059f4115ef219623ef) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Disconnect the lazy-animation IntersectionObserver when the controller disconnects.

  `lazyAnimate()` kept its observer in a local `const` and only unobserved from inside the callback, so an element removed before it ever scrolled into view left the observer — and through it the controller and the detached element — alive. This mirrors the `content-loader` fix in [#207](https://github.com/stimulus-components/stimulus-components/issues/207).

  `lazyValue` was also declared as `number` while the value is registered as a `Boolean`; it is now typed correctly.

  This adds the package's first spec.

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.0.0] - 2024-02-25

### Chore

- Renaming the component from `stimulus-animated-number` to `@stimulus-components/animated-number`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [4.1.0] - 2022-12-16

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Upgrading dependencies
- Upgrading Vite to 4.x
- Upgrading Node to `18.x`

## [4.0.0] - 2021-11-13

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to 14.18.0

## [3.0.0] - 2021-05-25

### Chore

- Moving from Snowpack to Vite
- Using stimulus as external library reducing bundle size from `40.81kb` to `0.76kb`.
- Moving to TypeScript
- Upgrading Node to 14.17.0

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `values` static property

```diff
- <strong data-controller="animated-number" data-animated-number-start="0" data-animated-number-end="100" data-animated-number-duration="3000"></strong>
+ <strong data-controller="animated-number" data-animated-number-start-value="0" data-animated-number-end-value="100" data-animated-number-duration-value="3000"></strong>
```

## [1.0.0] - 2020-11-10

### Added

- Adding controller
