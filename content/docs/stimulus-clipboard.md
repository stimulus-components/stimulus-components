---
title: Clipboard
description: A Stimulus controller to copy text to clipboard.
package: clipboard
---

## Installation

```bash
$ yarn add stimulus-clipboard
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import Clipboard from 'stimulus-clipboard'

const application = Application.start()
application.register('clipboard', Clipboard)
```

<DocsDemoLink package-name="clipboard"></DocsDemoLink>

## Usage

In your view:

```html
<div data-controller="clipboard" data-clipboard-success-content-value="Copied!">
  <input type="text" value="Click the button to copy me!" data-clipboard-target="source" />

  <button type="button" data-action="clipboard#copy" data-clipboard-target="button">Copy to clipboard</button>
</div>
```

## 🛠 Configuration

| Attribute                               | Default | Description                                              | Optional |
| --------------------------------------- | ------- | -------------------------------------------------------- | -------- |
| `data-clipboard-success-content-value`  | ''      | Text to display on button.                               | ✅       |
| `data-clipboard-success-duration-value` | `2000`  | Duration in ms to display the success content on button. | ✅       |

`data-clipboard-target="button"` attribute is `optional` if you don't want to change the text of the button.

## 🎛 Extending Controller

<DocsExtendingController>

```js
import Clipboard from 'stimulus-clipboard'

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

</DocsExtendingController>
