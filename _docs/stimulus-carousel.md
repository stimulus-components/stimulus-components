---
layout: component
title: Carousel
package: carousel
netlify_id: ea47f6e3-99fb-46f3-a567-4ec122ab92ed
---

A Stimulus controller to deal with carousel.

This controller is using [Swiper](https://swiperjs.com/) behind the scene.

## Installation

```bash
$ yarn add stimulus-carousel
```

And use it in your JS file:
```js
// Probably in app/javascript/controllers/index.js

import { Application } from "@hotwired/stimulus"
import Carousel from "stimulus-carousel"

const application = Application.start()
application.register("carousel", Carousel)
```

{% include demo.md %}

## Before starting

You must import the `Swiper` CSS in your `js` file:

```js
// In your application.js (for example)
import 'swiper/css/bundle'
```

## Usage

Basic usage:
```html
<div data-controller="carousel" class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
</div>
```

With options:
```html
<div
  data-controller="carousel"
  class="swiper-container"
  data-carousel-options-value='{"direction": "vertical"}'
>
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
</div>
```

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-carousel-options-value` | `{}` | Options for swiper.js as JSON string. | ✅ |

## 🎛 Extending Controller

{% capture content %}
```js
import Carousel from "stimulus-carousel"

export default class extends Carousel {
  connect() {
    super.connect()
    console.log("Do what you want here.")

    // The swiper instance.
    this.swiper

    // Default options for every carousels.
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
