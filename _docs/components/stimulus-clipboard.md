---
layout: component
title: Clipoard
parent: Available controllers
package: clipboard
netlify_id: 80f85acb-2a15-4326-9bd1-92a461e53c22
---

A Stimulus controller to copy text to clipboard.

## Installation

```bash
$ yarn add stimulus-clipboard
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import Clipboard from "stimulus-clipboard"

const application = Application.start()
application.register("clipboard", Clipboard)
```

{% include demo.md %}

## Usage

In your view:
```html
<div
  data-controller="clipboard"
  data-clipboard-success-text="Copied!"
>
  <input
    type="text"
    value="Click the button to copy me!"
    data-clipboard-target="source"
  />

  <button
    type="button"
    data-action="clipboard#copy"
    data-clipboard-target="button"
  >
    Copy to clipboard
  </button>
</div>
```

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-clipboard-success-text` | `undefined` | Text to display on button. | ✅ |
| `data-clipboard-success-delay-value` | `2000` | Delay before displaying the original button text again. | ✅ |

`data-clipboard-target="button"` attribute is `optional` if you don't want to change the text of the button.

## 🎛 Extending Controller

{% capture content %}
```js
import Clipboard from "stimulus-clipboard"

export default class extends Clipboard {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }

  // Function to override on copy.
  copy () {

  }

  // Function to override when to input is copied.
  copied () {
    //
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
