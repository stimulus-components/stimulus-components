# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.0.2] - 2024-02-03

### Chore

- Allow more flexible peer dependency range for `@rails/request.js`.

## [5.0.1] - 2024-03-23

### Chore

- Fixing [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [5.0.0] - 2024-03-22

### Chore

- Renaming the component from `stimulus-sortable` to `@stimulus-components/sortable`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [4.1.1] - 2023-06-16

### Added

- Return the response object from `onUpdate`

### Chore

- Bump dependencies.

## [4.1.0] - 2022-12-25

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Bump dependencies.
- Upgrading to Vite `4.x`.
- Docs new UI.
- Upgrading Node to `18.x`.

## [4.0.0] - 2022-10-31

### Chore

- **Breaking** Replacing `end` method by `onUpdate` to make patch request only if position actually changed.

## [3.3.0] - 2022-10-31

### Chore

- Upgrading Node to 16
- Bump dependencies
- Using dependencies as `external` libraries to reduce package size.

## [3.2.0] - 2022-02-04

### Added

- Adding `responseKind` option. Thanks @diachini!

## [3.1.0] - 2021-10-12

### Chore

- Moving from `@rails/ujs` to the new `@rails/request.js`

## [3.0.0] - 2021-10-11

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- **Breaking** Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite)
- Upgrading Node to 14.18.0
- Moving to TypeScript

## [2.1.0] - 2021-04-28

### Added

- Adding `paramName` option.

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `values` static property

```diff
- <ul data-controller="sortable" data-sortable-handle=".handle">
+ <ul data-controller="sortable" data-sortable-handle-value=".handle">
```

## [1.2.0] - 2020-12-03

### Changed

- Destroy the instance on `disconnect`.
- Adding `defaultOptions` support.

## [1.1.0] - 2020-10-19

### Added

- Adding data-sortable-resource-name option 2021d57

### Changed

- Importing rails-ujs
- Using window.\_rails_loaded 4dc14c3

## [1.0.0] - 2020-10-15

### Added

- Adding controller
