# Changelog

## 6.2.0

### Minor Changes

- [#221](https://github.com/stimulus-components/stimulus-components/pull/221) [`b93d4df`](https://github.com/stimulus-components/stimulus-components/commit/b93d4df6021e3f433bc03fdcc85ada8601659b2a) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Never toggle disabled checkboxes, and add a `ignoreDisabled` value to control how they count in the indeterminate state.

  `toggle()` wrote `checked` on every checkbox target, including the disabled ones. A user cannot change a disabled checkbox and the browser does not submit it, so the `checkboxAll` target must not change it either. It now toggles only the enabled checkbox targets. Closes [#110](https://github.com/stimulus-components/stimulus-components/issues/110), and ports stimulus-components/stimulus-checkbox-select-all#10.

  That leaves the question raised in the review of that PR: what the `checkboxAll` target must show when a disabled checkbox keeps a different state. It is now an option, like `disableIndeterminate`:

  - by default, the disabled checkboxes still count, so the `checkboxAll` target stays indeterminate after a "Select All" click when one disabled checkbox is unchecked;
  - with `data-checkbox-select-all-ignore-disabled-value="true"`, only the checkboxes that the `checkboxAll` target can change are counted, and the indeterminate state disappears when all the enabled checkboxes are checked.

  Two related changes make this work:

  - `toggle()` now calls `refresh()`. The checkbox targets do not emit a `change` event when the controller writes their `checked` property, so the state of the `checkboxAll` target was never computed again after a click. Without disabled checkboxes this changes nothing, because the recomputed state matches the state the browser already applied.
  - The `checked` property of the `checkboxAll` target now counts only the enabled checkbox targets, so a click always toggles them. Counting the disabled ones there made the control show a selection it could not clear: with all the enabled checkboxes unchecked and one disabled checkbox checked, every click was read as "deselect all" and the enabled checkboxes could never be checked again. The `indeterminate` property still counts the disabled checkboxes, unless `ignoreDisabled` is set.

  Adds `enabled` and `disabled` getters, next to `checked` and `unchecked`.

### Patch Changes

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

- [#217](https://github.com/stimulus-components/stimulus-components/pull/217) [`e5cddaf`](https://github.com/stimulus-components/stimulus-components/commit/e5cddaf13c1031d3a9a244ff519e319bb69876ab) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Replace the remaining `@ts-expect-error`/`@ts-ignore` comments with real types.

  `EventTarget` casts stand in for the suppressions in `checkbox-select-all`, `dropdown` and `popover`. In `rails-nested-form` and `popover` the honest types surfaced a real `null` case — a remove button outside any wrapper, and a `currentTarget` that has already been cleared — which now returns early instead of raising a `TypeError`.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.1.0] - 2024-11-12

### Chore

- Add an option to disable the indeterminate state.

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
