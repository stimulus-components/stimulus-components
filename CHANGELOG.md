# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Change

- **Breaking**: Using data-maps in [reveal controller](https://github.com/guillaumebriday/stimulus-components/tree/master/src/reveal) instead of plain data attribute for hidden class.

```diff
- <div data-controller="reveal" data-hidden-class="hidden">
+ <div data-controller="reveal" data-reveal-hidden-class="hidden">
```

- **Breaking**: Rename `toggleAll` method to `toggle` in [checkbox-select-all controller](https://github.com/guillaumebriday/stimulus-components/tree/master/src/checkbox-select-all)

```diff
- <input type="checkbox" data-action="change->checkbox-select-all#toggleAll" />
+ <input type="checkbox" data-action="change->checkbox-select-all#toggle" />
```

## [2.0.0] - 2020-10-12

### Added
- Adding `hide` and `show` method to `reveal` controller

### Changed
- Rename `toggle` controller into `reveal`

## [1.2.1] - 2020-10-12

- Fixing remote controller event

## [1.2.0] - 2020-10-12

- Adding Remote controller

## [1.1.0] - 2020-10-12

- Adding NestedForm controller
- Adding CheckboxSelectAll controller

## [1.0.2] - 2020-09-29

### Added

- Adding Toggle controller
