---
title: Scroll Reveal
description: A Stimulus controller that animates an element when it becomes visible.
package: scroll-reveal
packagePath: '@stimulus-components/scroll-reveal'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Usage

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="scroll-reveal">
  <p data-scroll-reveal-target="item" class="reveal">Hello</p>
  <p data-scroll-reveal-target="item" class="reveal" data-delay="250ms">World!</p>
</div>
```

::

With custom options:

::code-block{tabName="app/views/index.html"}

```html
<div
  data-controller="scroll-reveal"
  data-scroll-reveal-class-value="active fade"
  data-scroll-reveal-threshold-value="0.9"
  data-scroll-reveal-root-margin-value="10px"
>
  <p data-scroll-reveal-target="item" class="reveal">With custom</p>
  <p data-scroll-reveal-target="item" class="reveal">options!</p>
</div>
```

::

## Configuration

| Attribute                              | Default | Description                                                     | Optional |
| -------------------------------------- | ------- | --------------------------------------------------------------- | -------- |
| `data-scroll-reveal-class-value`       | `'in'`  | These classes are added on the element when it becomes visible. | ✅       |
| `data-scroll-reveal-threshold-value`   | `0.1`   | The threshold option for the IntersectionObserver.              | ✅       |
| `data-scroll-reveal-root-margin-value` | `'0px'` | The rootMargin option for the IntersectionObserver.             | ✅       |

It's up to you to create the CSS transition animation.
This controller basically simply adds a class to an element when it becomes visible.

For instance:

::code-block{tabName="app/javascript/stylesheets/application.css"}

```css
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
```

::

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/scroll_reveal_controller.js"}

```js
import ScrollReveal from '@stimulus-components/scroll-reveal'

export default class extends ScrollReveal {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }

  // Override this method to change the IntersectionObserver behavior
  intersectionObserverCallback(entries, observer) {
    //
  }

  // Options used for the IntersectionObserver
  get intersectionObserverOptions() {
    return {}
  }

  // You can override this getter to set your default options here.
  get defaultOptions() {
    return {
      class: 'active',
      threshold: 0.5,
      rootMargin: '100px',
    }
  }
}
```

::
::
