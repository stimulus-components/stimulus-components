---
title: Lightbox
description: A Stimulus controller to add a lightbox on images.
package: lightbox
packagePath: "@stimulus-components/lightbox"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

::alert
This component is based on [PhotoSwipe](https://photoswipe.com/){target="\_blank" .underline .hover:no-underline}.
::

## Example

:lightbox

## Usage

Before starting, you must import the PhotoSwipe stylesheet in your `js` or in your `sass`:

::code-block{tabName="app/javascript/index.js"}

```js
import "photoswipe/style.css"
```

::

Or in your sass:
::code-block{tabName="app/javascript/stylesheets/application.scss"}

```scss
@import "photoswipe/style.css";
```

::

Every link inside the gallery must declare the size of the full resolution image with `data-pswp-width` and `data-pswp-height`. PhotoSwipe needs both to open the image at the right size without a layout shift.

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="lightbox">
  <a href="img/img1.jpg" data-pswp-width="1600" data-pswp-height="1067">
    <img src="img/thumb1.jpg" alt="" />
  </a>

  <a href="img/img2.jpg" data-pswp-width="1600" data-pswp-height="1067">
    <img src="img/thumb2.jpg" alt="" />
  </a>

  <a href="img/img3.jpg" data-pswp-width="1600" data-pswp-height="1067">
    <img src="img/thumb3.jpg" alt="" />
  </a>
</div>
```

::

With options:

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="lightbox" data-lightbox-options-value='{"bgOpacity": 0.9, "loop": false}'>
  <a href="img/img1.jpg" data-pswp-width="1600" data-pswp-height="1067">
    <img src="img/thumb1.jpg" alt="" />
  </a>

  <a href="img/img2.jpg" data-pswp-width="1600" data-pswp-height="1067">
    <img src="img/thumb2.jpg" alt="" />
  </a>
</div>
```

::

## Configuration

| Attribute                     | Default | Description                                                                                                                | Optional |
| ----------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| `data-lightbox-options-value` | `{}`    | [Options for PhotoSwipe](https://photoswipe.com/options/){target="\_blank" .underline .hover:no-underline} as JSON string. | ✅       |

The controller always sets `gallery` to the controller element, so that option is ignored. `children` defaults to `"a"` and `pswpModule` to the PhotoSwipe core module; both can be overridden.

## Migrating from v4

Version 5 replaces [lightGallery](https://www.lightgalleryjs.com/){target="\_blank" .underline .hover:no-underline} with [PhotoSwipe](https://photoswipe.com/){target="\_blank" .underline .hover:no-underline}. lightGallery is dual-licensed and requires a paid license key for commercial use, while PhotoSwipe is MIT. Three things change:

1. Import `photoswipe/style.css` instead of `lightgallery/css/lightgallery.css`.
2. Add `data-pswp-width` and `data-pswp-height` to every link of the gallery.
3. Replace the lightGallery options in `data-lightbox-options-value` with their [PhotoSwipe equivalents](https://photoswipe.com/options/){target="\_blank" .underline .hover:no-underline}. The option names are different, and no option carries over as is.

The instance is now exposed as `this.photoSwipe` instead of `this.lightGallery`.

You do not have to install `photoswipe` yourself, it ships as a dependency of the package.

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/lightbox_controller.js"}

```js
import Lightbox from "@stimulus-components/lightbox"

export default class extends Lightbox {
  connect() {
    super.connect()
    console.log("Do what you want here.")

    // Get the PhotoSwipe lightbox instance
    this.photoSwipe

    // Default options for every lightboxes.
    this.defaultOptions
  }

  // You can set default options in this getter.
  get defaultOptions() {
    return {
      // Load the PhotoSwipe core on the first click instead of upfront.
      pswpModule: () => import("photoswipe"),
    }
  }
}
```

::
::
