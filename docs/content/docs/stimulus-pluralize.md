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
<div data-controller="pluralize">
  <input data-pluralize-target="input" type="number" placeholder="0">

  There
  <span data-pluralize-target="text" data-singular="is" data-plural="are"></span>
  <strong data-pluralize-target="value"></strong>
  <span data-pluralize-target="text" data-singular="puppy" data-plural="puppies"></span>
  from this input.
</div>
```

<!-- :: -->
::
