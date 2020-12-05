---
layout: component
title: Animated Number
parent: Available controllers
package: animated-number
netlify_id: bc3d072f-f5ce-4bda-b8a7-a7f362f626db
---

A Stimulus controller that animates a numerical value by counting to it.

## Installation

```bash
$ yarn add stimulus-animated-number
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import AnimatedNumber from "stimulus-animated-number"

const application = Application.start()
application.register("animated-number", AnimatedNumber)
```

{% include demo.md %}

## Usage

In your view:
```html
<div
  data-controller="animated-number"
  data-animated-number-start-value="0"
  data-animated-number-end-value="200"
  data-animated-number-duration-value="3000"
>
  0
</div>

<div
  data-controller="animated-number"
  data-animated-number-lazy-value=""
  data-animated-number-start-value="0"
  data-animated-number-end-value="200"
  data-animated-number-duration-value="3000"
>
  This animation will start only when the element become visible thanks to Intersection Observers.
</div>

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

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-animated-number-start-value` | `undefined` | Number, at which animation starts. | ❌ |
| `data-animated-number-end-value` | `undefined` | Number, at which animation ends. | ❌ |
| `data-animated-number-duration-value` | `undefined` | Total animation duration in milliseconds. | ❌ |
| `data-animated-number-lazy-value` | `undefined` | Fetch content when element is visible. | ✅ |
| `data-animated-number-lazy-root-margin-value` | `0px` | rootMargin option for Intersection Observer. | ✅ |
| `data-animated-number-lazy-threshold-value` | `0` | threshold option for Intersection Observer. | ✅ |

## 🎛 Extending Controller

{% capture content %}
```js
import AnimatedNumber from "stimulus-animated-number"

export default class extends AnimatedNumber {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
