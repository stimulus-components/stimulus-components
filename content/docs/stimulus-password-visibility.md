---
title: Password Visibility
description: A Stimulus controller to change a password input visibility.
package: password-visibility
packagePath: '@stimulus-components/password-visibility'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Usage

```html
<div data-controller="password-visibility">
  <input type="password" data-password-visibility-target="input" spellcheck="false" />

  <button type="button" data-action="password-visibility#toggle">
    <span data-password-visibility-target="icon">Eye</span>
    <span data-password-visibility-target="icon" class="hidden">Eye Slash</span>
  </button>
</div>
```

## Configuration

| Attribute                               | Default  | Description                       | Optional |
| --------------------------------------- | -------- | --------------------------------- | -------- |
| `data-password-visibility-hidden-class` | `hidden` | Class to toggle icons visibility. | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/password_visibility_controller.js"}

```js
import PasswordVisibility from '@stimulus-components/password-visibility'

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

::
::
