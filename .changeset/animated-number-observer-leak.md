---
"@stimulus-components/animated-number": patch
---

Disconnect the lazy-animation IntersectionObserver when the controller disconnects.

`lazyAnimate()` kept its observer in a local `const` and only unobserved from inside the callback, so an element removed before it ever scrolled into view left the observer — and through it the controller and the detached element — alive. This mirrors the `content-loader` fix in #207.

`lazyValue` was also declared as `number` while the value is registered as a `Boolean`; it is now typed correctly.

This adds the package's first spec.
