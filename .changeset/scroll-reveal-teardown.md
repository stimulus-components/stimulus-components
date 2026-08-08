---
"@stimulus-components/scroll-reveal": patch
---

Disconnect the IntersectionObserver instead of unobserving each item.

`disconnect()` iterated `itemTargets` and unobserved them one by one, so any item already removed from the DOM — it had dropped out of that list — stayed observed and kept the observer alive. `observer.disconnect()` releases everything in one call.

This adds the package's first spec.
