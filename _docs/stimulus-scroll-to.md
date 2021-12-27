---
layout: component
title: ScrollTo
package: scroll-to
netlify_id: 26d5363d-d699-4558-abb4-2267919dbe59
---

A Stimulus controller to scroll to elements.

## Installation

```bash
$ yarn add stimulus-scroll-to
```

And use it in your JS file:
```js
// Probably in app/javascript/controllers/index.js

import { Application } from "@hotwired/stimulus"
import ScrollTo from "stimulus-scroll-to"

const application = Application.start()
application.register("scroll-to", ScrollTo)
```

{% include demo.md %}

## Usage

```html
<a href="#awesome-stuff-here" data-controller="scroll-to">Scroll to #awesome-stuff-here</a>

<h2 id="awesome-stuff-here">Awesome stuff here</h2>
```

With options:
```html
<a
  href="#awesome-stuff-here"
  data-controller="scroll-to"
  data-scroll-to-offset-value="150"
  data-scroll-to-behavior-value="auto"
>Scroll to #awesome-stuff-here</a>

<h2 id="awesome-stuff-here">Awesome stuff here</h2>
```

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-scroll-to-offset-value` | `10` | Offset in pixels from top of the element. | ✅ |
| `data-scroll-to-behavior-value` | `smooth` | The scroll behavior. `auto` or `smooth`. | ✅ |

## 🎛 Extending Controller

{% capture content %}
```js
import ScrollTo from "stimulus-scroll-to"

export default class extends ScrollTo {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }

  // You can set default options in this getter for all your anchors.
  get defaultOptions () {
    return {
      offset: 100,
      behavior: 'auto'
    }
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}

## Compatibility

The [Window.scrollTo()](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo) method is used under the hood.

It's basically compatible with every modern browsers. For now, Safari does not provide `smooth` behavior scroll support.

See [https://caniuse.com/mdn-api_scrolltooptions_behavior](https://caniuse.com/mdn-api_scrolltooptions_behavior).

You can easily add it with this polyfill: [smoothscroll-polyfill](https://github.com/iamdustan/smoothscroll).
