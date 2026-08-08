---
"@stimulus-components/prefetch": patch
---

Disconnect the IntersectionObserver when the controller disconnects.

`load()` kept its observer in a local `const` and only unobserved from inside the callback, so a link removed before it ever scrolled into view left the observer — and through it the controller and the detached link — alive. This mirrors the `content-loader` fix in #207.

This adds the package's first spec.
