# Changelog

## 5.1.0

### Minor Changes

- [#223](https://github.com/stimulus-components/stimulus-components/pull/223) [`0abb8ad`](https://github.com/stimulus-components/stimulus-components/commit/0abb8ad77f2aac00d3802ac786ba970ad73834ee) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Keep the `aria-expanded` attribute of the trigger in sync with the state of the items.

  `toggle`, `show` and `hide` now read the event and write `aria-expanded` on the element the action is attached to: `toggle` flips it, `show` sets it to `true`, `hide` sets it to `false`. A screen reader could not tell whether the items were shown or hidden before. Closes [#105](https://github.com/stimulus-components/stimulus-components/issues/105), and ports stimulus-components/stimulus-reveal-controller#11.

  The attribute is opt-in, which is the difference with that pull request: the controller only writes it when the trigger already declares it, so it never adds `aria-expanded` to an element that is not a control for the items. Existing markup is unchanged until an `aria-expanded` attribute is added to the trigger.

  The three methods take an optional event parameter, so calling them without one, from a subclass or from another controller, still works.

### Patch Changes

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.0.0] - 2024-03-17

### Chore

- Renaming the component from `stimulus-reveal-controller` to `@stimulus-components/reveal`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [4.1.0] - 2022-12-25

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Bump dependencies.
- Upgrading to Vite `4.x`.
- Docs new UI.
- Upgrading Node to `18.x`.

## [4.0.0] - 2021-10-27

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to `14.18.1`

## [3.0.0] - 2021-06-01

### Chore

- Remove puppeteer for Vanilla Jest
- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://vitejs.dev/)
- Using stimulus as external library reducing bundle size from `40.43kb` to `0.38kb`.
- Moving to [TypeScript](https://www.typescriptlang.org/).
- Upgrading Node to 14.17.0

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `targets` syntax.

```diff
- <p data-target="reveal.item" class="hidden">
+ <p data-reveal-target="item" class="hidden">
```

## [1.0.0] - 2020-10-16

### Added

- Adding controller
