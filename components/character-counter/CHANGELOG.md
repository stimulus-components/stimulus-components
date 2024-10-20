# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.0.0] - 2024-02-25

### Chore

- Renaming the component from `stimulus-character-counter` to `@stimulus-components/character-counter`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [4.2.0] - 2022-12-23

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Updating docs style.
- Upgrading dependencies.
- Upgrading Node to `18.x`.

## [4.1.0] - 2022-08-20

## Added

- Adding countdown mode (https://github.com/stimulus-components/stimulus-character-counter/pull/4)

## [4.0.0] - 2021-11-13

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to 14.18.0

## [3.0.1] - 2021-05-17

### Fixed

- Fixing dependency name

## [3.0.0] - 2021-05-17

### Chore

- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite)
- Upgrading Node to 14.16.1
- Using TypeScript

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `targets` syntax.

```diff
- <strong data-target="character-counter.counter"></strong>
+ <strong data-character-counter-target="counter"></strong>
```

## [1.0.0] - 2020-11-03

### Added

- Adding controller
