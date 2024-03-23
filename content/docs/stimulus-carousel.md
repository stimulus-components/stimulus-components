---
title: Carousel
description: A Stimulus controller to deal with carousel.
package: carousel
packagePath: '@stimulus-components/carousel'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

::alert
This component is based on the [Swiper](https://swiperjs.com/){target="\_blank" .underline .hover:no-underline}.
::

## Before starting

You must import the `Swiper` CSS in your `js` file:

::code-block{tabName="app/javascript/index.js"}

```js
import 'swiper/css/bundle'
```

::

## Usage

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="carousel" class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
</div>
```

::

With options:

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="carousel" class="swiper-container" data-carousel-options-value='{"direction": "vertical"}'>
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
</div>
```

::

## Configuration

| Attribute                     | Default | Description                           | Optional |
| ----------------------------- | ------- | ------------------------------------- | -------- |
| `data-carousel-options-value` | `{}`    | Options for swiper.js as JSON string. | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/carousel_controller.js"}

```js
import Carousel from '@stimulus-components/carousel'

export default class extends Carousel {
  connect() {
    super.connect()
    console.log('Do what you want here.')

    // The swiper instance.
    this.swiper

    // Default options for every carousels.
    this.defaultOptions
  }

  // You can set default options in this getter.
  get defaultOptions() {
    return {
      // Your default options here
    }
  }
}
```

::
::
