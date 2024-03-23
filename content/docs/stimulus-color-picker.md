---
title: Color Picker
description: A Stimulus controller to create color picker.
package: color-picker
packagePath: '@stimulus-components/color-picker'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

::alert
This component is based on the [@simonwep/pickr](https://github.com/Simonwep/pickr){target="\_blank" .underline .hover:no-underline}.
::

## Usage

Before starting, your must import the theme you want to use in your `js` or in your `sass`:

::code-block{tabName="app/javascript/index.js"}

```js
import '@simonwep/pickr/dist/themes/classic.min.css'
// import '@simonwep/pickr/dist/themes/monolith.min.css'
// import '@simonwep/pickr/dist/themes/nano.min.css'

// Or in your sass
@import '~@simonwep/pickr/dist/themes/classic.min.css'
// @import '~@simonwep/pickr/dist/themes/monolith.min.css'
// @import '~@simonwep/pickr/dist/themes/nano.min.css'
```

::

Basic usage:

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="color-picker">
  <input type="hidden" name="color" value="#667EEA" data-color-picker-target="input" />

  <div data-color-picker-target="button"></div>
</div>
```

::

## Configuration

| Attribute                       | Default   | Description                  | Optional |
| ------------------------------- | --------- | ---------------------------- | -------- |
| `data-color-picker-theme-value` | `classic` | Pickr theme you want to use. | ✅       |

See the [Pickr documentation](https://github.com/Simonwep/pickr#usage) for more info in the library itself.

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/color_picker_controller.js"}

```js
import ColorPicker from '@stimulus-components/color-picker'

export default class extends ColorPicker {
  connect() {
    super.connect()
    console.log('Do what you want here.')

    // Pickr instance
    this.picker
  }

  // Callback when the color is saved
  onSave(color) {
    super.onSave(color)
  }

  // You can override the components options with this getter.
  // Here are the default options.
  get componentOptions() {
    return {
      preview: true,
      hue: true,

      interaction: {
        input: true,
        clear: true,
        save: true,
      },
    }
  }

  // You can override the swatches with this getter.
  // Here are the default options.
  get swatches() {
    return [
      '#A0AEC0',
      '#F56565',
      '#ED8936',
      '#ECC94B',
      '#48BB78',
      '#38B2AC',
      '#4299E1',
      '#667EEA',
      '#9F7AEA',
      '#ED64A6',
    ]
  }
}
```

::
::
