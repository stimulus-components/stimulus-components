---
title: Dialog
description: A Stimulus controller to show modals with the native Dialog element.
package: dialog
packagePath: '@stimulus-components/dialog'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

::alert
This component is based on the native &lt;Dialog&gt; Element. [Check the documentation on MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog){target="\_blank" .underline .hover:no-underline}.
::

## Usage

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="dialog" data-action="click->dialog#backdropClose">
  <dialog data-dialog-target="dialog">
    <p>The modal's content here</p>

    <button type="button" data-action="dialog#close" autofocus>Cancel</button>
  </dialog>

  <button type="button" data-action="dialog#open">Open modal</button>
</div>
```

::

Optionally, you can customize the dialog style.
::code-block{tabName="app/javascript/stylesheets/application.css"}

```css
/* Prevent scrolling while dialog is open */
body:has(dialog[data-dialog-target='dialog'][open]) {
  overflow: hidden;
}

/* Customize the dialog backdrop */
dialog {
  box-shadow: 0 0 0 100vw rgb(0 0 0 / 0.5);
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Add animations */
dialog[data-dialog-target='dialog'][open] {
  animation: fade-in 200ms forwards;
}

dialog[data-dialog-target='dialog'][closing] {
  animation: fade-out 200ms forwards;
}
```

::

## Configuration

| Attribute                | Default | Description                | Optional |
| ------------------------ | ------- | -------------------------- | -------- |
| `data-dialog-open-value` | `false` | Open the modal by default. | ❌       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/dialog_controller.js"}

```js
import Dialog from '@stimulus-components/dialog'

export default class extends Dialog {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }

  // Function to override on open.
  open() {}

  // Function to override on close.
  close() {}

  // Function to override on backdropClose.
  backdropClose() {}
}
```

::
::
