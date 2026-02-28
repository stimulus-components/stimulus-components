---
title: Hotkey
description: A Stimulus controller that triggers click or focus on the element when a keyboard shortcut is pressed.
package: hotkey
packagePath: "@stimulus-components/hotkey"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

This controller is based on [Basecamp's fizzy hotkey controller](https://github.com/basecamp/fizzy/blob/main/app/javascript/controllers/hotkey_controller.js).

## Example

:hotkey

## Usage

Bind key events with Stimulus actions. The controller ignores key presses when the event target is inside an `input` or `textarea`.

**Click on key (link):**

::code-block{tabName="app/views/index.html"}

```html
<a href="/docs" data-controller="hotkey" data-action="keydown.g@document->hotkey#click"> Go to docs (g) </a>
```

::

**Click on key (button):**

::code-block{tabName="app/views/index.html"}

```html
<button type="button" data-controller="hotkey" data-action="keydown.j@document->hotkey#click">Submit</button>
```

::

**Focus on key:**

::code-block{tabName="app/views/index.html"}

```html
<input
  type="text"
  data-controller="hotkey"
  data-action="keydown.k@document->hotkey#focus"
  placeholder="Focus target (k)"
/>
```

::

Use any [keyboard event filter](https://stimulus.hotwired.dev/reference/actions#keyboardevent-filter) in the action (e.g. `keydown.space`, `keydown.esc`).

The controller does not run when the event is `defaultPrevented` or when the element has `pointer-events: none`.

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/hotkey_controller.js"}

```js
import Hotkey from "@stimulus-components/hotkey"

export default class extends Hotkey {
  click(event) {
    super.click(event)
    console.log("Do what you want here.")
  }

  focus(event) {
    super.focus(event)
  }
}
```

::
::
