# Changelog

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
