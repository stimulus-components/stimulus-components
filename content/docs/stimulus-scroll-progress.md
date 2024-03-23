---
title: Scroll Progress
description: A Stimulus controller to add a progress bar when scrolling.
package: scroll-progress
packagePath: '@stimulus-components/scroll-progress'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Usage

Add a `div` just after the `body` opening tag:

::code-block{tabName="app/views/index.html"}

```html
<body>
  <div data-controller="scroll-progress" class="h-2 bg-indigo-400 fixed top-0"></div>
</body>
```

::

It's up to you to design it as you want.

## Configuration

To improve performance, the `scroll` event is [throttled](https://lodash.com/docs/4.17.15#throttle).

| Attribute                                   | Default | Description                                                            | Optional |
| ------------------------------------------- | ------- | ---------------------------------------------------------------------- | -------- |
| `data-scroll-progress-throttle-delay-value` | `15`    | Delay in milliseconds to update the scroll position. (`0` to disable). | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/scroll_progress_controller.js"}

```js
import ScrollProgress from '@stimulus-components/scroll-progress'

export default class extends ScrollProgress {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
::
