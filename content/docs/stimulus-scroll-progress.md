---
title: Scroll Progress
description: A Stimulus controller to add a progress bar when scrolling.
package: scroll-progress
---

## Installation

```bash
$ yarn add stimulus-scroll-progress
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import ScrollProgress from 'stimulus-scroll-progress'

const application = Application.start()
application.register('scroll-progress', ScrollProgress)
```

:demo-link{package-name="scroll-progress"}

## Usage

Add a `div` just after the `body` opening tag:

In your view:

```html
<body>
  <div data-controller="scroll-progress" class="h-2 bg-indigo-400 fixed top-0"></div>
</body>
```

It's up to you to design it as you want.

## 🛠 Configuration

To improve performance, the `scroll` event is [throttled](https://lodash.com/docs/4.17.15#throttle).

| Attribute                                   | Default | Description                                                            | Optional |
| ------------------------------------------- | ------- | ---------------------------------------------------------------------- | -------- |
| `data-scroll-progress-throttle-delay-value` | `15`    | Delay in milliseconds to update the scroll position. (`0` to disable). | ✅       |

## 🎛 Extending Controller

::extending-controller

```js
import ScrollProgress from 'stimulus-scroll-progress'

export default class extends ScrollProgress {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
