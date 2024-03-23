---
title: Clipboard
description: A Stimulus controller to copy text to clipboard.
package: clipboard
packagePath: '@stimulus-components/clipboard'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Usage

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="clipboard" data-clipboard-success-content-value="Copied!">
  <input type="text" value="Click the button to copy me!" data-clipboard-target="source" />

  <button type="button" data-action="clipboard#copy" data-clipboard-target="button">Copy to clipboard</button>
</div>
```

::

## Configuration

| Attribute                               | Default | Description                                              | Optional |
| --------------------------------------- | ------- | -------------------------------------------------------- | -------- |
| `data-clipboard-success-content-value`  | ''      | Text to display on button.                               | ✅       |
| `data-clipboard-success-duration-value` | `2000`  | Duration in ms to display the success content on button. | ✅       |

`data-clipboard-target="button"` attribute is `optional` if you don't want to change the text of the button.

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/clipboard_controller.js"}

```js
import Clipboard from '@stimulus-components/clipboard'

export default class extends Clipboard {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }

  // Function to override on copy.
  copy() {}

  // Function to override when to input is copied.
  copied() {
    //
  }
}
```

::
::
