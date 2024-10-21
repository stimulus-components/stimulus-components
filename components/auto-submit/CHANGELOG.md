# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.0.0] - 2024-03-23

### Chore

- **Breaking** Rename the `save` method to `submit`.

```diff
- <%= f.text_field :description, data: { action: 'keyup->auto-submit#save' } %>
+ <%= f.text_field :description, data: { action: 'keyup->auto-submit#submit' } %>
```

- Renaming the component from `stimulus-rails-autosave` to `@stimulus-components/auto-submit`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [5.1.0] - 2023-12-25

### Chore

- Adding interactive example
- Using a `debounce` function without `lodash.debounce`.

## [5.0.1] - 2023-12-02

### Chore

- Fixing module exports

## [5.0.0] - 2023-12-02

### Chore

- **Breaking** Remove `@rails/ujs` support. Migrate to Turbo.
- Change the default `delay` option from `0` to `150`.
- Upgrading dependencies

## [4.1.1] - 2022-11-06

- Removing `@rails/ujs` from dependencies. Making `@rails/ujs` completely optional.

## [4.1.0] - 2022-11-06

### Chore

- Upgrading to node 18
- Upgrading dependencies
- Using `lodash.debounce` instead of `lodash`
- Using `requestSubmit` if `@rails/ujs` is not detected, so we can use this package without Rails-ujs at all.

## [4.0.0] - 2021-09-29

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading to node `14.18.0`
- Upgrading dependencies

## [3.0.0] - 2021-05-31

### Chore

- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite).
- Using stimulus as external library reducing bundle size from `122.96kb` to `0.33kb`.
- Moving to [TypeScript](https://www.typescriptlang.org/).
- Upgrading Node to 14.17.0

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `values` static property

```diff
- <%= form_with model: @todo, data: { controller: 'autosave', autosave_delay: '1000' } do |f| %>
+ <%= form_with model: @todo, data: { controller: 'autosave', autosave_delay_value: 1000 } do |f| %>
```

## [1.0.0] - 2020-11-13

### Added

- Adding controller
