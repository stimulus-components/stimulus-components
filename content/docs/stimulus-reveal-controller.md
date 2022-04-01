---
title: Reveal Controller
description: A Stimulus controller to toggle a class on one or multiple items to show or hide them.
package: reveal-controller
netlify_id: 83f0dddb-31fa-4025-a04f-dd26f153d646
---

## Installation

```bash
$ yarn add stimulus-reveal-controller
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import Reveal from 'stimulus-reveal-controller'

const application = Application.start()
application.register('reveal', Reveal)
```

<DocsDemoLink package-name="reveal-controller"></DocsDemoLink>

## Usage

### Toggle

```html
<div data-controller="reveal" data-reveal-hidden-class="hidden">
  <button data-action="click->reveal#toggle" type="button" class="btn">Toggle me!</button>

  <p data-reveal-target="item" class="hidden mt-4">Hey 👋</p>
  <p data-reveal-target="item" class="hidden mt-4">You can have multiple items</p>
</div>
```

### Show

```html
<div data-controller="reveal">
  <button data-action="click->reveal#show" type="button" class="btn">Show me!</button>

  <p data-reveal-target="item" class="hidden mt-4">Hey 👋</p>
</div>
```

### Hide

```html
<div data-controller="reveal">
  <button data-action="click->reveal#hide" type="button" class="btn">Hide me!</button>

  <p data-reveal-target="item" class="mt-4">Hey 👋</p>
</div>
```

## 🛠 Configuration

| Attribute                  | Default  | Description         | Optional |
| -------------------------- | -------- | ------------------- | -------- |
| `data-reveal-hidden-class` | `hidden` | CSS class to toggle | ✅       |

## 🎛 Extending Controller

<DocsExtendingController>

```js
import Reveal from 'stimulus-reveal-controller'

export default class extends Reveal {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

</DocsExtendingController>
