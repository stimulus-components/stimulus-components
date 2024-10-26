# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.0.1] - 2024-03-23

### Chore

- Fixing [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [5.0.0] - 2024-03-22

### Chore

- Renaming the component from `stimulus-scroll-to` to `@stimulus-components/scroll-to`
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
- Upgrading Node to 14.18.1

### Fixed

- Allow default offset to be set to 0.

## [3.0.0] - 2021-05-17

### Chore

- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite)
- Upgrading Node to 14.16.1
- Moving to TypeScript

## [2.0.1] - 2020-12-05

### Changed

- Fixing Stimulus version in peerDependencies.

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0
- Namespace warn message

### Changed

**Breaking** Using the new `values` static property.

```diff
- <a href="#awesome-stuff-here" data-controller="scroll-to" data-scroll-to-offset="50">Scroll</a>
+ <a href="#awesome-stuff-here" data-controller="scroll-to" data-scroll-to-offset-value="50">Scroll</a>
```

## [1.0.0] - 2020-11-24

### Added

- Adding controller
