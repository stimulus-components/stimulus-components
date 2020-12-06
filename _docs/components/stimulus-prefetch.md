---
layout: component
title: Prefetch
parent: Available controllers
package: prefetch
netlify_id: d3b878bb-b10c-47d2-a21b-e0a510120a4c
---

A Stimulus controller that prefetch in-viewport links.

## Installation

```bash
$ yarn add stimulus-prefetch
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import Prefetch from "stimulus-prefetch"

const application = Application.start()
application.register("prefetch", Prefetch)
```

{% include demo.md %}

## Usage

```html
<a href="/about" data-controller="prefetch">About</a>.
```

**Note**: To improve performance, links will only be prefetched if they are in the viewport and if the user isn't on a slow connection.

## 🎛 Extending Controller

{% capture content %}
```js
import Prefetch from "stimulus-prefetch"

export default class extends Prefetch {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
