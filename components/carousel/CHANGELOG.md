# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.0.0] - 2024-02-25

- **Breaking** Upgrading Swiper to `11.x`.
- Renaming the component from `stimulus-carousel` to `@stimulus-components/carousel`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [5.0.1] - 2022-12-27

### Fixed

- Fixing `module` extension in `package.json`.

## [5.0.0] - 2022-12-23

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- **Breaking** Upgrading Swiper to `8.x`.
- Upgrading Vite to `4.x`.
- Updating example UI.
- Upgrading Node to `18`.

## [4.0.0] - 2021-12-27

### Chore

- Breaking Upgrading Stimulus to 3.x and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to `16.13.1`.

## [3.0.0] - 2021-09-24

### Chore

- Upgrade [Swiper](https://swiperjs.com/) to version 7.x.
- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite).
- Using stimulus as external library reducing bundle size from `172.31kb` to `0.63kb`.
- Moving to TypeScript
- Upgrading Node to 14.17.6

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `values` static property

```diff
- <div data-controller="carousel" class="swiper-container" data-carousel-options="{'direction': 'vertical'}">
+ <div data-controller="carousel" class="swiper-container" data-carousel-options-value='{"direction": "vertical"}'>
```

## [1.0.2] - 2020-11-13

### Changed

- Don't import css in the js file.

## [1.0.1] - 2020-11-12

### Changed

- Destroy the `swiper` instance on disconnect.

## [1.0.0] - 2020-11-11

### Added

- Adding controller
