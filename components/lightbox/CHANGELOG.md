# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.0] - 2024-03-17

### Chore

- Renaming the component from `stimulus-lightbox` to `@stimulus-components/lightbox`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [3.2.0] - 2022-12-23

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Bump dependencies.
- Upgrading to Vite `4.x`.
- Docs new UI.

## [3.1.0] - 2022-11-03

### Chore

- Adding `lightGallery` instance variable
- Destroy instance on `disconnect`
- Using TypeScript types
- Upgrading dependencies
- Upgrading Node to `18`.

## [3.0.0] - 2021-12-27

### Chore

- **Breaking** Upgrading Stimulus to 3.x and change namespace from `stimulus` to `@hotwired/stimulus`.
- **Breaking** Upgrading from `lightgallery.js` (v1) to `lightgallery` (v2).
- Moving from `Snowpack` to `Vite`.
- Using stimulus as external library reducing bundle size from `18.44KiB` to `0.46kb`.
- Moving to TypeScript
- Upgrading dependencies
- Upgrading Node to `16.13.1`.

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0
- Adding getter to retrieve the lightGallery instance

### Changed

- **Breaking** Using the new `values` static property

```diff
- <div data-controller="lightbox" data-lightbox-options="{'index': 2}">
+ <div data-controller="lightbox" data-lightbox-options-value='{"index": 2}'>
```

## [1.0.0] - 2020-11-11

### Added

- Adding controller
