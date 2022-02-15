---
layout: component
title: Read More
package: read-more
netlify_id: e0c5cf44-d938-4675-870d-fd50b58fca72
parent: Components list
---

A Stimulus controller to show more or less text.

## Installation

```bash
$ yarn add stimulus-read-more
```

And use it in your JS file:
```js
// Probably in app/javascript/controllers/index.js

import { Application } from "@hotwired/stimulus"
import ReadMore from "stimulus-read-more"

const application = Application.start()
application.register("read-more", ReadMore)
```

{% include demo.md %}

## Usage

In your view:
```html
<div
  data-controller="read-more"
  data-read-more-more-text-value="Read more"
  data-read-more-less-text-value="Read less"
>
  <p data-read-more-target="content">Lorem ipsum dolor sit am&hellip;</p>

  <button data-action="read-more#toggle">
    Read more
  </button>

  <template data-read-more-target="full">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam.
  </template>
</div>
```

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-read-more-more-text-value` | `undefined` | Text to display to show more text. | ✅ |
| `data-read-more-less-text-value` | `undefined` | Text to display to show less text. | ✅ |

## 🎛 Extending Controller

{% capture content %}
```js
import ReadMore from "stimulus-read-more"

export default class extends ReadMore {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }

  // Function to override on toggle.
  toggle (event) {}

  // Function to override when the text is shown.
  show (event) {}

  // Function to override when the text is hidden.
  hide (event) {}
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
