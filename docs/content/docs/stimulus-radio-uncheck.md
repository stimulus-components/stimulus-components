---
title: Radio Uncheck
description: A Stimulus controller for unchecking all radio buttons in a group.
package: radio-uncheck
packagePath: "@stimulus-components/radio-uncheck"
isNew: true
---

## Installation

:installation-block{:package="package" :packagePath="packagePath" controllerName="radio-uncheck"}

## Examples

:radio-uncheck

## Usage

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="radio-uncheck">
  <input type="radio" name="radio" value="1" data-radio-uncheck-target="input" />
  <label for="radio-1">Radio 1</label>
  <input type="radio" name="radio" value="2" data-radio-uncheck-target="input" />
  <label for="radio-2">Radio 2</label>
  <input type="radio" name="radio" value="3" data-radio-uncheck-target="input" />
  <label for="radio-3">Radio 3</label>

  <button data-action="radio-uncheck#uncheck">Uncheck</button>
</div>
```

::

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/radio_uncheck_controller.js"}

```js
import RadioUncheck from "@stimulus-components/radio-uncheck"

export default class extends RadioUncheckController {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```

::
::
