---
title: Color Picker
description: A Stimulus controller to create color picker.
package: color-picker
---

This controller is using [@simonwep/pickr](https://github.com/Simonwep/pickr) behind the scene.

## Installation

```bash
$ yarn add stimulus-color-picker
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import ColorPicker from 'stimulus-color-picker'

const application = Application.start()
application.register('color-picker', ColorPicker)
```

<DocsDemoLink package-name="color-picker"></DocsDemoLink>

## Usage

Before starting, your must import the theme you want to use in your `js` or in your `sass`:

```js
// In your application.js (for example)
import '@simonwep/pickr/dist/themes/classic.min.css'
// import '@simonwep/pickr/dist/themes/monolith.min.css'
// import '@simonwep/pickr/dist/themes/nano.min.css'

// Or in your sass
@import '~@simonwep/pickr/dist/themes/classic.min.css'
// @import '~@simonwep/pickr/dist/themes/monolith.min.css'
// @import '~@simonwep/pickr/dist/themes/nano.min.css'
```

Basic usage:

```html
<div data-controller="color-picker">
  <input type="hidden" name="color" value="#667EEA" data-color-picker-target="input" />

  <div data-color-picker-target="button"></div>
</div>
```

## 🛠 Configuration

| Attribute                       | Default   | Description                  | Optional |
| ------------------------------- | --------- | ---------------------------- | -------- |
| `data-color-picker-theme-value` | `classic` | Pickr theme you want to use. | ✅       |

See the [Pickr documentation](https://github.com/Simonwep/pickr#usage) for more info in the library itself.

## 🎛 Extending Controller

<DocsExtendingController>

```js
import ColorPicker from 'stimulus-color-picker'

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

</DocsExtendingController>
