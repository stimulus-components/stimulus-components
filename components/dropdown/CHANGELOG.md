# Changelog

## 3.1.0

### Minor Changes

- [#183](https://github.com/stimulus-components/stimulus-components/pull/183) [`45fd9ec`](https://github.com/stimulus-components/stimulus-components/commit/45fd9ec42e3bb8e0bddf691c0648365147aaa93f) Thanks [@MatheusRich](https://github.com/MatheusRich)! - Keep the `aria-expanded` attribute of the button in sync with the state of the menu.

  The controller accepts a new `button` target, the element that opens the menu. When it is present, `connect`, `toggle` and `hide` write `aria-expanded` on it: `true` once the menu opens, `false` once it closes, whether it is closed from the button, from an item inside the menu, or by a click outside. A screen reader could not tell whether the menu was open or closed before. The markup in the documentation also points the button at the menu with `aria-controls`, which completes the [ARIA disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).

  The attribute comes from the synchronous `transitioned` flag of `useTransition`, not from the classes of the menu, so it never drifts while the leave transition plays. `connect` also corrects a value that does not match the initial state of the menu.

  The target is optional: without it the controller writes no attribute, so existing markup is unchanged.

### Patch Changes

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

- [#217](https://github.com/stimulus-components/stimulus-components/pull/217) [`e5cddaf`](https://github.com/stimulus-components/stimulus-components/commit/e5cddaf13c1031d3a9a244ff519e319bb69876ab) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Replace the remaining `@ts-expect-error`/`@ts-ignore` comments with real types.

  `EventTarget` casts stand in for the suppressions in `checkbox-select-all`, `dropdown` and `popover`. In `rails-nested-form` and `popover` the honest types surfaced a real `null` case — a remove button outside any wrapper, and a `currentTarget` that has already been cleared — which now returns early instead of raising a `TypeError`.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2024-03-17

### Chore

- Renaming the component from `stimulus-dropdown` to `@stimulus-components/dropdown`
- Upgrading dependencies
- Exporting Typescript Types
- Updating demo UI
- Add [Stimulus LSP](https://github.com/marcoroth/stimulus-lsp) compatibility

## [2.1.0] - 2022-12-23

### Added

- Adding `name` in library export to use the package with CDN, Sprockets and `import-maps`.

### Chore

- Upgrading to Node `18`.
- Bump dependencies.
- Upgrading to Vite `4.x`.
- Docs new UI.

## [2.0.0] - 2022-01-07

### Chore

- **Breaking** Upgrading Stimulus to `3.x` and change namespace from `stimulus` to `@hotwired/stimulus`.
- Upgrading dependencies
- Upgrading Node to 16.

## [1.0.0] - 2021-07-15

### Added

- Adding controller
