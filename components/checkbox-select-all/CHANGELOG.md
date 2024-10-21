# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.0.0] - 2024-02-27

### Chore

- Renaming the component from `stimulus-checkbox-select-all` to `@stimulus-components/checkbox-select-all`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [5.3.0] - 2023-12-22

### Chore

- Bump dependencies.
- Add type declaration file `index.d.ts`.

## [5.2.0] - 2022-12-23

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Upgrading to Node `18`.
- Bump dependencies.
- Upgrading to Vite `4.x`.
- Using new Stimulus lifecycle callbacks to make the controller function properly when checkbox checkboxAll targets are dynamically added and/or removed from the DOM. (https://github.com/stimulus-components/stimulus-checkbox-select-all/pull/19).

## [5.1.0] - 2022-04-15

### Chore

- Upgrading workflows
- Upgrading to Node 16
- Bump dependencies
- Fixing external Vite config reducing package size from `2.70 KiB` to `0.50 KiB`.

## [5.0.0] - 2021-09-28

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to 14.18.0

## [4.0.0] - 2021-05-05

### Added

- Trigger `input` event on checkboxes when toggled.

### Chore

- Remove puppeteer for Vanilla Jest
- Adding new specs
- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite)
- Using `stimulus` as external library reducing bundle size from `41.10kb` to `1.05kb`.
- Moving to TypeScript
- Upgrading Node to 14.16.1

## [3.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `targets` syntax.

```diff
- <input type="checkbox" data-target="checkbox-select-all.checkbox" />
+ <input type="checkbox" data-checkbox-select-all-target="checkbox" />
```

## [2.1.0] - 2020-11-03

### Added

- Adding `checked` and `unchecked` getters.

## [2.0.0] - 2020-10-31

### Changed

- **Breaking** `data-target="checkbox-select-all.checkboxAll"` is now required.
- **Breaking** `data-action="change->checkbox-select-all#toggle"` has been be removed.

```diff
- <input type="checkbox" data-action="change->checkbox-select-all#toggle" />
+ <input type="checkbox" data-target="checkbox-select-all.checkboxAll" />
```

## [1.1.0] - 2020-10-29

### Added

- Indeterminate state support

Add `data-target="checkbox-select-all.checkboxAll"` attribute to use it. It's optional.

```diff
- <input type="checkbox" data-action="change->checkbox-select-all#toggle" />
+ <input type="checkbox" data-target="checkbox-select-all.checkboxAll" data-action="change->checkbox-select-all#toggle" />
```

### Changed

- Adding `stimulus` as `peerDependencies`

## [1.0.0] - 2020-10-15

### Added

- Adding controller
