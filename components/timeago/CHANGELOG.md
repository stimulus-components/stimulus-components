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

- Using proper value for option. Example: `data-timeago-add-suffix-value=""` is now `data-timeago-add-suffix-value="true"`
- Renaming the component from `stimulus-timeago` to `@stimulus-components/timeago`
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

## [4.0.1] - 2022-10-31

### Chore

- Updating workflows
- Updating Node to 16
- Bump dependencies
- Fixing external libraries

## [4.0.0] - 2021-09-25

### Changed

- **Breaking** Upgrading to Stimulus 3 and new `@hotwired/stimulus` package.

## [3.0.0] - 2021-05-04

### Chore

- Adding tests with Jest and JSDom
- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite)
- Upgrading Node to 14.16.1
- Defining `date-fns` and `Stimulus` as external dependencies reducing the package size from `51.13kb` to `0.95kb`.
- Using `stimulus` as peer dependencies.

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0
- Namespacing warn message in the console.

### Changed

**Breaking** Using the new `values` static property.

```diff
- <time data-controller="timeago" data-timeago-datetime="2018-01-30T09:00" data-timeago-refresh-interval="1000" data-timeago-include-seconds="" data-timeago-add-suffix=""></time>
+ <time data-controller="timeago" data-timeago-datetime-value="2018-01-30T09:00" data-timeago-refresh-interval-value="1000" data-timeago-include-seconds-value="" data-timeago-add-suffix-value=""></time>
```

## [1.2.0] - 2020-11-11

### Added

- Adding `locale` support.

## [1.1.0] - 2020-11-06

### Changed

- Catch`Invalid Date` error and display given value instead

## [1.0.0] - 2020-10-15

### Added

- Adding controller
