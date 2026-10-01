---
"@stimulus-components/lightbox": major
---

Replace `lightgallery` with [PhotoSwipe](https://photoswipe.com/).

lightGallery is dual-licensed: it is free for open source projects, but "if you are using the library for business, commercial sites, projects, and applications, the Commercial license is the appropriate license". Without a key it logs `lightGallery: 0000-0000-000-0000 license key is not valid for production use` in the console, and the key could not be set through this controller anyway. PhotoSwipe is MIT, has no dependencies, and needs no key. This closes [#107](https://github.com/stimulus-components/stimulus-components/issues/107).

This is a **major** bump because the underlying library, the markup, and the options all change:

- Import `photoswipe/style.css` instead of `lightgallery/css/lightgallery.css`.
- Add `data-pswp-width` and `data-pswp-height` to every link of the gallery. PhotoSwipe needs the size of the full resolution image to open it without a layout shift.
- Rewrite `data-lightbox-options-value` with the [PhotoSwipe options](https://photoswipe.com/options/). No lightGallery option carries over as is.
- The instance is exposed as `this.photoSwipe` instead of `this.lightGallery`.

The controller always sets `gallery` to the controller element. `children` defaults to `"a"` and `pswpModule` to the PhotoSwipe core module; both can be overridden through `defaultOptions` or `data-lightbox-options-value`. Overriding `pswpModule` with `() => import("photoswipe")` loads the core on the first click instead of upfront.
