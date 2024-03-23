---
title: Animated Number
description: A Stimulus controller that animates a numerical value by counting to it.
package: animated-number
packagePath: '@stimulus-components/animated-number'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Usage

::code-block{tabName="app/views/index.html"}

```html
<div
  data-controller="animated-number"
  data-animated-number-start-value="0"
  data-animated-number-end-value="200"
  data-animated-number-duration-value="3000"
>
  0
</div>
```

::

::code-block{tabName="app/views/index.html"}

```html
<div
  data-controller="animated-number"
  data-animated-number-lazy-value=""
  data-animated-number-start-value="0"
  data-animated-number-end-value="200"
  data-animated-number-duration-value="3000"
>
  This animation will start only when the element become visible thanks to Intersection Observers.
</div>
```

::

::code-block{tabName="app/views/index.html"}

```html
<div
  data-controller="animated-number"
  data-animated-number-lazy-value=""
  data-animated-number-lazy-root-margin-value="30px"
  data-animated-number-lazy-threshold-value="0.4"
  data-animated-number-start-value="0"
  data-animated-number-end-value="200"
  data-animated-number-duration-value="3000"
>
  You can customize the Intersection Observer options.
</div>
```

::

## Configuration

| Attribute                                     | Default     | Description                                  | Optional |
| --------------------------------------------- | ----------- | -------------------------------------------- | -------- |
| `data-animated-number-start-value`            | `undefined` | Number, at which animation starts.           | ❌       |
| `data-animated-number-end-value`              | `undefined` | Number, at which animation ends.             | ❌       |
| `data-animated-number-duration-value`         | `undefined` | Total animation duration in milliseconds.    | ❌       |
| `data-animated-number-lazy-value`             | `undefined` | Fetch content when element is visible.       | ✅       |
| `data-animated-number-lazy-root-margin-value` | `0px`       | rootMargin option for Intersection Observer. | ✅       |
| `data-animated-number-lazy-threshold-value`   | `0`         | threshold option for Intersection Observer.  | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/animated_number_controller.js"}

```js
import AnimatedNumber from '@stimulus-components/animated-number'

export default class extends AnimatedNumber {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
::
