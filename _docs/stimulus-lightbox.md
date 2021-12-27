---
layout: component
title: Lightbox
package: lightbox
netlify_id: a6137aa0-bbbc-401d-81cc-4677a91fe581
---

A Stimulus controller to add a lightbox on images.

This controller is using [lightgalleryjs](https://www.lightgalleryjs.com/) behind the scene.

## Installation

```bash
$ yarn add stimulus-lightbox
```

And use it in your JS file:
```js
// Probably in app/javascript/controllers/index.js

import { Application } from "@hotwired/stimulus"
import Lightbox from "stimulus-lightbox"

const application = Application.start()
application.register("lightbox", Lightbox)
```

{% include demo.md %}

## Usage

Before starting, your must import the `lightgallery.css` in your `js` or in your `sass`:
```js
// In your application.js (for example)
import 'lightgallery/css/lightgallery.css'

// Or in your sass
@import '~lightgallery/scss/lightgallery'
```

Basic usage:
```html
<div data-controller="lightbox">
  <a href="img/img1.jpg">
    <img src="img/img1.jpg" alt="" />
  </a>

  <a href="img/img2.jpg">
    <img src="img/img2.jpg" alt="" />
  </a>

  <a href="img/img3.jpg">
    <img src="img/img3.jpg" alt="" />
  </a>
</div>
```

With options:
```html
<div data-controller="lightbox" data-lightbox-options-value='{"index": 2}'>
  <a href="img/img1.jpg">
    <img src="img/img1.jpg" alt="" />
  </a>

  <a href="img/img2.jpg">
    <img src="img/img2.jpg" alt="" />
  </a>

  <a href="img/img3.jpg">
    <img src="img/img3.jpg" alt="" />
  </a>
</div>
```

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-lightbox-options-value` | `{}` | Options for lightgallery.js as JSON string. | ✅ |

## 🎛 Extending Controller

{% capture content %}
```js
import Lightbox from "stimulus-lightbox"

export default class extends Lightbox {
  connect() {
    super.connect()
    console.log("Do what you want here.")

    // Default options for every lightboxes.
    this.defaultOptions
  }

  // You can set default options in this getter.
  get defaultOptions () {
    return {
      // Your default options here
    }
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
