---
title: Lightbox
description: A Stimulus controller to add a lightbox on images.
package: lightbox
packagePath: '@stimulus-components/lightbox'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

::alert
This component is based on the [lightgalleryjs](https://www.lightgalleryjs.com/){target="\_blank" .underline .hover:no-underline}.
::

## Usage

Before starting, your must import the `lightgallery.css` in your `js` or in your `sass`:

::code-block{tabName="app/javascript/index.js"}

```js
import 'lightgallery/css/lightgallery.css'
```

::

Or in your sass:
::code-block{tabName="app/javascript/stylesheets/application.scss"}

```scss
@import '~lightgallery/scss/lightgallery';
```

::

::code-block{tabName="app/views/index.html"}

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

::

With options:

::code-block{tabName="app/views/index.html"}

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

::

## Configuration

| Attribute                     | Default | Description                                 | Optional |
| ----------------------------- | ------- | ------------------------------------------- | -------- |
| `data-lightbox-options-value` | `{}`    | Options for lightgallery.js as JSON string. | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/lightbox_controller.js"}

```js
import Lightbox from '@stimulus-components/lightbox'

export default class extends Lightbox {
  connect() {
    super.connect()
    console.log('Do what you want here.')

    // Get the lightgallery instance
    this.lightGallery

    // Default options for every lightboxes.
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
