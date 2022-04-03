---
title: Dropdown
description: A Stimulus controller to create a dropdown.
package: dropdown
netlify_id: e6e1b1d2-f834-44c5-a12a-c848f6d4cd5e
---

## Installation

```bash
$ yarn add stimulus-dropdown
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import Dropdown from 'stimulus-dropdown'

const application = Application.start()
application.register('dropdown', Dropdown)
```

This controller uses [stimulus-use/use-transition](https://stimulus-use.github.io/stimulus-use/#/use-transition) under the hood. You can change the animation behavior as you want.

<DocsDemoLink package-name="dropdown"></DocsDemoLink>

## Usage

In your view:

```html
<div data-controller="dropdown" class="relative">
  <button type="button" data-action="dropdown#toggle click@window->dropdown#hide">Options</button>

  <div
    data-dropdown-target="menu"
    class="hidden transition transform origin-top-right absolute right-0"
    data-transition-enter-from="opacity-0 scale-95"
    data-transition-enter-to="opacity-100 scale-100"
    data-transition-leave-from="opacity-100 scale-100"
    data-transition-leave-to="opacity-0 scale-95"
  >
    <a href="#" data-action="dropdown#toggle">Account settings</a>
    <a href="#" data-action="dropdown#toggle">Support</a>
    <a href="#" data-action="dropdown#toggle">License</a>
  </div>
</div>
```

[TailwindCSS](https://tailwindcss.com/) is used in this example but it's up to you to style the dropdown as you want.

## 🎛 Extending Controller

<DocsExtendingController>

```js
import Dropdown from 'stimulus-dropdown'

export default class extends Dropdown {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }

  toggle(event) {
    super.toggle()
  }

  hide(event) {
    super.hide(event)
  }
}
```

</DocsExtendingController>
