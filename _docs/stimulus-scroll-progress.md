---
layout: component
title: Scroll Progress
package: scroll-progress
netlify_id: 8a6c0c4d-2ff0-4da3-ba96-3a14cbad811a
---

A Stimulus controller to add a progress bar when scrolling.

## Installation

```bash
$ yarn add stimulus-scroll-progress
```

And use it in your JS file:
```js
// Probably in app/javascript/controllers/index.js

import { Application } from "stimulus"
import ScrollProgress from "stimulus-scroll-progress"

const application = Application.start()
application.register("scroll-progress", ScrollProgress)
```

{% include demo.md %}

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

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-scroll-progress-throttle-delay-value` | `15` | Delay in milliseconds to update the scroll position. (`0` to disable). | ✅ |

## 🎛 Extending Controller

{% capture content %}
```js
import ScrollProgress from "stimulus-scroll-progress"

export default class extends ScrollProgress {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
