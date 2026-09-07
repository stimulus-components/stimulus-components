---
title: Pluralize
description: A Stimulus controller that handles choosing singular/plural strings based on a number.
package: pluralize
packagePath: "@stimulus-components/pluralize"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Example

:pluralize

## Usage

::code-block{tabName="app/views/index.html"}

```html
<!-- using input -->
<div data-controller="pluralize">
  <input data-pluralize-target="input" type="number" placeholder="0">

  There
  <span data-pluralize-target="text" data-singular="is" data-plural="are"></span>
  <strong data-pluralize-target="value"></strong>
  <span data-pluralize-target="text" data-singular="puppy" data-plural="puppies"></span>
  from this input.
</div>

<!-- using observation -->
<div data-controller="pluralize">
  <input data-pluralize-target="input" type="number" placeholder="0">

  There
  <span data-pluralize-target="text" data-singular="is" data-plural="are"></span>
  <strong data-pluralize-target="observe"></strong>
  <span data-pluralize-target="text" data-singular="puppy" data-plural="puppies"></span>
  from this observation.
</div>

```

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/pluralize_controller.js"}

```js
import Pluralize from "@stimulus-components/pluralize"

export default class extends Pluralize {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }

  // Function to override when getting plural text for a target
  getPlural(target)

  // Function to override when getting singular text for a target
  getSingular(target)

  // Function to override if you want to change the logic from
  // 1 = singular, otherwise plural
  getText(target, count)
}
```

::
::
