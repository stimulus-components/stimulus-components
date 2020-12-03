---
layout: component
title: Stimulus Reveal Controller
parent: Available controllers
package: reveal-controller
netlify_id: 83f0dddb-31fa-4025-a04f-dd26f153d646
tests: true
---

A Stimulus controller to toggle a class on one or multiple items to show or hide them.

## Installation

```bash
$ yarn add stimulus-reveal-controller
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import Reveal from "stimulus-reveal-controller"

const application = Application.start()
application.register("reveal", Reveal)
```

{% include demo.md %}

## Usage


### Toggle
```html
<div data-controller="reveal" data-reveal-hidden-class="hidden">
  <button data-action="click->reveal#toggle" type="button" class="btn">
    Toggle me!
  </button>

  <p data-target="reveal.item" class="hidden mt-4">Hey 👋</p>
  <p data-target="reveal.item" class="hidden mt-4">You can have multiple items</p>
</div>
```

### Show
```html
<div data-controller="reveal">
  <button data-action="click->reveal#show" type="button" class="btn">
    Show me!
  </button>

  <p data-target="reveal.item" class="hidden mt-4">Hey 👋</p>
</div>
```

### Hide
```html
<div data-controller="reveal">
  <button data-action="click->reveal#hide" type="button" class="btn">
    Hide me!
  </button>

  <p data-target="reveal.item" class="mt-4">Hey 👋</p>
</div>
```

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-reveal-hidden-class` | `hidden` | CSS class to toggle | ✅ |

## 🎛 Extending Controller

{% capture content %}
```js
import Reveal from "stimulus-reveal-controller"

export default class extends Reveal {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
