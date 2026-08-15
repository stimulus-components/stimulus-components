---
title: Reveal Controller
description: A Stimulus controller to toggle a class on one or multiple items to show or hide them.
package: reveal-controller
packagePath: "@stimulus-components/reveal"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath" controllerName="reveal"}

## Example

:reveal

## Usage

### Toggle

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="reveal" data-reveal-hidden-class="d-none">
  <button data-action="reveal#toggle" type="button" class="btn" aria-expanded="false">Toggle me!</button>

  <p data-reveal-target="item" class="d-none mt-4">Hey 👋</p>
  <p data-reveal-target="item" class="d-none mt-4">You can have multiple items</p>
</div>
```

::

### Show

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="reveal">
  <button data-action="reveal#show" type="button" class="btn" aria-expanded="false">Show me!</button>

  <p data-reveal-target="item" class="hidden mt-4">Hey 👋</p>
</div>
```

::

### Hide

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="reveal">
  <button data-action="reveal#hide" type="button" class="btn" aria-expanded="true">Hide me!</button>

  <p data-reveal-target="item" class="mt-4">Hey 👋</p>
</div>
```

::

### Accessibility

When the element the action is attached to already has an `aria-expanded` attribute, the controller keeps it in sync: `toggle` flips it, `show` sets it to `true` and `hide` sets it to `false`. Give it the value that matches the initial state of the items, `aria-expanded="false"` when they start hidden.

The attribute is opt-in. The controller never adds it to an element that does not declare it, because `aria-expanded` is only valid on a control that shows and hides content.

## Configuration

| Attribute                  | Default  | Description         | Optional |
| -------------------------- | -------- | ------------------- | -------- |
| `data-reveal-hidden-class` | `hidden` | CSS class to toggle | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/reveal_controller.js"}

```js
import Reveal from "@stimulus-components/reveal"

export default class extends Reveal {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```

::
::
