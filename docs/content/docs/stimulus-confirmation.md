---
title: Confirmation
description: A Stimulus controller to confirm actions manually.
package: confirmation
packagePath: "@stimulus-components/confirmation"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Examples

Basic example
:confirmation

You can also use multiple inputs and checkboxes, or just checkboxes, to activate multiple buttons and inputs.
:confirmation-checkboxes

## Usage

`data-confirmation-content` can contain any desired value.

It is only required if used on an `input` element of type `"text"` that also includes the attribute `data-confirmation-target="input"`.

::code-block{tabName="app/views/index.html"}

```html
<form data-controller="confirmation">
  <input data-confirmation-target="input" data-confirmation-content="DELETE" data-action="confirmation#check" />

  <label>
    <input data-confirmation-target="input" data-action="confirmation#check" type="checkbox" />

    I have read the terms and conditions
  </label>

  <label>
    <input data-confirmation-target="input" data-action="confirmation#check" type="checkbox" />

    I confirm that I want to permanently delete this project
  </label>

  <button type="submit" data-confirmation-target="item" disabled>Delete</button>
  <input data-confirmation-target="item" disabled />
</form>
```

::

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/confirmation_controller.js"}

```js
import Confirmation from "@stimulus-components/confirmation"

export default class extends Confirmation {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }

  // Function to determine whether the inputs should be enabled.
  check() {
    super.check()
  }
}
```

::
::
