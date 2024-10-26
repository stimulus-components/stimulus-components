# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.0.0] - 2024-03-23

### Chore

- Renaming the component from `stimulus-remote-rails` to `@stimulus-components/remote-rails`
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

## [4.0.0] - 2021-11-13

### Chore

- Breaking Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to 14.18.1

## [3.0.1] - 2021-07-09

### Changed

- Adding stopPropagation on all methods

## [3.0.0] - 2021-05-17

### Chore

- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite)
- Upgrading Node to 14.16.1
- Moving to TypeScript

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

## [1.1.1] - 2020-11-03

### Changed

- Changing `innerHTML` to `outerHTML` in the replace method.
- Using `@rails/ujs` and `stimulus` as peerDependencies.

## [1.1.0] - 2020-10-28

## Added

- Adding prepend method

## Changed

- Using `afterend` hook in append method

## [1.0.0] - 2020-10-15

### Added

- Adding controller
