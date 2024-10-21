# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.0] - 2024-03-17

### Chore

- Renaming the component from `stimulus-scroll-reveal` to `@stimulus-components/scroll-reveal`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [3.2.0] - 2023-03-24

### Added

- Allow multiple `class` in `data-scroll-reveal-class-value`. Example: `data-scroll-reveal-class-value="in fade"`.

## [3.1.0] - 2022-12-25

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Bump dependencies.
- Upgrading to Vite `4.x`.
- Docs new UI.
- Upgrading Node to `18.x`.

## [3.0.0] - 2021-11-13

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to 14.18.0

## [2.0.0] - 2021-05-18

### Chore

- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite)
- Using stimulus as external library reducing bundle size.
- Upgrading Node to 14.16.1
- Moving to TypeScript

## [1.0.0] - 2021-01-14

### Added

- Adding controller
