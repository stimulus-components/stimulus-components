---
title: Textarea Autogrow
description: A Stimulus controller for autogrowing textarea.
package: textarea-autogrow
packagePath: 'stimulus-textarea-autogrow'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Usage

::code-block{tabName="app/views/index.html"}

```html
<textarea data-controller="textarea-autogrow">
Very long text here.
</textarea>

<textarea data-controller="textarea-autogrow" data-textarea-autogrow-resize-debounce-delay-value="500">
Very long text here.
</textarea>
```

::

## Configuration

The height is calculated on window resize to match the content height.

| Attribute                                            | Default | Description                                                     | Optional |
| ---------------------------------------------------- | ------- | --------------------------------------------------------------- | -------- |
| `data-textarea-autogrow-resize-debounce-delay-value` | `100`   | Delay before autogrow on resize in milliseconds (0 to disable). | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/textarea_autogrow_controller.js"}

```js
import TextareaAutogrow from 'stimulus-textarea-autogrow'

export default class extends TextareaAutogrow {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
::
