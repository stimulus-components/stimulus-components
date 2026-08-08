---
"@stimulus-components/scroll-progress": patch
---

Throttle `scroll` once instead of re-wrapping it on every connect.

`connect()` wrapped `this.scroll` in a fresh throttle every time it ran, and Stimulus reuses the controller instance when the same element leaves and re-enters the DOM. Each cycle stacked another layer, and every layer schedules its own timer on every scroll event, so a page that reconnects the bar repeatedly ends up doing that work N times per scroll. The wrapping now happens once, in `initialize()`.

This also adds the package's first spec.
