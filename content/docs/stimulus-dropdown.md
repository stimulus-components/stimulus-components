---
title: Dropdown
description: A Stimulus controller to create a dropdown.
package: dropdown
packagePath: '@stimulus-components/dropdown'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

This controller uses [stimulus-use/use-transition](https://stimulus-use.github.io/stimulus-use/#/use-transition) under the hood. You can change the animation behavior as you want.

## Usage

::code-block{tabName="app/views/index.html"}

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

::

::alert
[TailwindCSS](https://tailwindcss.com/){target="\_blank" .underline .hover:no-underline} is used in this example, but it's up to you to style the dropdown as you want.
::

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/dropdown_controller.js"}

```js
import Dropdown from '@stimulus-components/dropdown'

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

::
::
