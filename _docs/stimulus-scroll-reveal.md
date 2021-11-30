---
layout: component
title: Scroll Reveal
package: scroll-reveal
netlify_id: 95f25f38-cc08-41e5-8cb7-ee19eba62499
---

A Stimulus controller that animates an element when it becomes visible.

## Installation

```bash
$ yarn add stimulus-scroll-reveal
```

And use it in your JS file:
```js
// Probably in app/javascript/controllers/index.js

import { Application } from "stimulus"
import ScrollReveal from "stimulus-scroll-reveal"

const application = Application.start()
application.register("scroll-reveal", ScrollReveal)
```

{% include demo.md %}

## Usage

In your view:
```html
<div data-controller="scroll-reveal">
  <p data-scroll-reveal-target="item" class="reveal">Hello</p>
  <p data-scroll-reveal-target="item" class="reveal" data-delay="250ms">World!</p>
</div>
```

With custom options:

```html
<div
  data-controller="scroll-reveal"
  data-scroll-reveal-class-value="active"
  data-scroll-reveal-threshold-value="0.9"
  data-scroll-reveal-root-margin-value="10px"
>
  <p data-scroll-reveal-target="item" class="reveal">With custom</p>
  <p data-scroll-reveal-target="item" class="reveal">options!</p>
</div>
```

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-scroll-reveal-class-value` | `'in'` | This class is added on the element when it becomes visible. | ✅ |
| `data-scroll-reveal-threshold-value` | `0.1` | The threshold option for the IntersectionObserver. | ✅ |
| `data-scroll-reveal-root-margin-value` | `'0px'` | The rootMargin option for the IntersectionObserver. | ✅ |


It's up to you to create the CSS transition animation.
This controller basically simply adds a class to an element when it becomes visible.

For instance:

```html
<style>
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: 1s cubic-bezier(0.5, 0, 0, 1);
    transition-property: opacity, transform;
  }

  .reveal.in {
    opacity: 1;
    transform: none;
  }
</style>
```


## 🎛 Extending Controller

{% capture content %}
```js
import ScrollReveal from "stimulus-scroll-reveal"

export default class extends ScrollReveal {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }

  // Override this method to change the IntersectionObserver behavior
  intersectionObserverCallback (entries, observer) {
    //
  }

  // Options used for the IntersectionObserver
  get intersectionObserverOptions () {
    return {}
  }

  // You can override this getter to set your default options here.
  get defaultOptions () {
    return {
      class: 'active',
      threshold: 0.5,
      rootMargin: '100px'
    }
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
