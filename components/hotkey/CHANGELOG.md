# Changelog

## 1.0.1

### Patch Changes

- [#191](https://github.com/stimulus-components/stimulus-components/pull/191) [`ee55aef`](https://github.com/stimulus-components/stimulus-components/commit/ee55aef8d654d93a5e839733bb079e709759f8f1) Thanks [@guillaumebriday](https://github.com/guillaumebriday)! - Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-02-28

### Added

- Initial release.
- `click` action: prevent default and programmatically click the element when the key is pressed (if the element is clickable and the event is not ignored).
- `focus` action: prevent default and focus the element when the key is pressed.
- Ignore key events when the target is inside `input`, `textarea`, or `lexxy-editor`.
- Skip click/focus when the element has `pointer-events: none`.
