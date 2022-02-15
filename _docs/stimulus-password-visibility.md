---
layout: component
title: Password Visibility
package: password-visibility
netlify_id: cb3eca87-30b7-4645-8ca1-399eec80c8d1
parent: Components list
---

A Stimulus controller to change a password input visibility.

## Installation

```bash
$ yarn add stimulus-password-visibility
```

And use it in your JS file:
```js
// Probably in app/javascript/controllers/index.js

import { Application } from "@hotwired/stimulus"
import PasswordVisibility from "stimulus-password-visibility"

const application = Application.start()
application.register("password-visibility", PasswordVisibility)
```

{% include demo.md %}

## Usage

In your view:
```html
<div data-controller="password-visibility">
  <input type="password" data-password-visibility-target="input" />

  <button type="button" data-action="password-visibility#toggle">
    <span data-password-visibility-target="icon">Eye</span>
    <span data-password-visibility-target="icon" class="hidden">Eye Slash</span>
  </button>
</div>
```

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-password-visibility-hidden-class` | `hidden` | Class to toggle icons visibility. | ✅ |

## 🎛 Extending Controller

{% capture content %}
```js
import PasswordVisibility from "stimulus-password-visibility"

export default class extends PasswordVisibility {
  connect() {
    super.connect()

    // Do what you want here.
  }

  toggle (event) {
    super.toggle()

    // Do what you want here
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
