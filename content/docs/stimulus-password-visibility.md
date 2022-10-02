---
title: Password Visibility
description: A Stimulus controller to change a password input visibility.
package: password-visibility
netlify_id: cb3eca87-30b7-4645-8ca1-399eec80c8d1
---

## Installation

```bash
$ yarn add stimulus-password-visibility
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import PasswordVisibility from 'stimulus-password-visibility'

const application = Application.start()
application.register('password-visibility', PasswordVisibility)
```

<DocsDemoLink package-name="password-visibility"></DocsDemoLink>

## Usage

In your view:

```html
<div data-controller="password-visibility">
  <input type="password" data-password-visibility-target="input" spellcheck="false" />

  <button type="button" data-action="password-visibility#toggle">
    <span data-password-visibility-target="icon">Eye</span>
    <span data-password-visibility-target="icon" class="hidden">Eye Slash</span>
  </button>
</div>
```

## 🛠 Configuration

| Attribute                               | Default  | Description                       | Optional |
| --------------------------------------- | -------- | --------------------------------- | -------- |
| `data-password-visibility-hidden-class` | `hidden` | Class to toggle icons visibility. | ✅       |

## 🎛 Extending Controller

<DocsExtendingController>

```js
import PasswordVisibility from 'stimulus-password-visibility'

export default class extends PasswordVisibility {
  connect() {
    super.connect()

    // Do what you want here.
  }

  toggle(event) {
    super.toggle()

    // Do what you want here
  }
}
```

</DocsExtendingController>
