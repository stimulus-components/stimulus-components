---
title: Textarea Autogrow
description: A Stimulus controller for autogrowing textarea.
package: textarea-autogrow
netlify_id: 073b5fee-358d-4dbf-b807-52034690f8ef
---

## Installation

```bash
$ yarn add stimulus-textarea-autogrow
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import TextareaAutogrow from 'stimulus-textarea-autogrow'

const application = Application.start()
application.register('textarea-autogrow', TextareaAutogrow)
```

<DocsDemoLink package-name="textarea-autogrow"></DocsDemoLink>

## Usage

In your view:

```html
<textarea data-controller="textarea-autogrow">
Very long text here.
</textarea>

<textarea data-controller="textarea-autogrow" data-textarea-autogrow-resize-debounce-delay-value="500">
Very long text here.
</textarea>
```

## 🛠 Configuration

The height is calculated on window resize to match the content height.

| Attribute                                            | Default | Description                                                     | Optional |
| ---------------------------------------------------- | ------- | --------------------------------------------------------------- | -------- |
| `data-textarea-autogrow-resize-debounce-delay-value` | `100`   | Delay before autogrow on resize in milliseconds (0 to disable). | ✅       |

## 🎛 Extending Controller

<DocsExtendingController>

```js
import TextareaAutogrow from 'stimulus-textarea-autogrow'

export default class extends TextareaAutogrow {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

</DocsExtendingController>
