---
title: Prefetch
description: A Stimulus controller that prefetch in-viewport links.
package: prefetch
packagePath: '@stimulus-components/prefetch'
---

::alert
If you have Turbo >=8 enabled in your app, you don't need this component because it's now a built-in feature.
::

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Usage

::code-block{tabName="app/views/index.html"}

```html
<a href="/about" data-controller="prefetch">About</a>.
```

::

**Note**: To improve performance, links will only be prefetched if they are in the viewport and if the user isn't on a slow connection.

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/prefetch_controller.js"}

```js
import Prefetch from '@stimulus-components/prefetch'

export default class extends Prefetch {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
::
