---
"@stimulus-components/auto-submit": patch
---

Debounce `submit` once instead of re-wrapping it on every connect.

`connect()` wrapped `this.submit` in a fresh debounce every time it ran, and Stimulus reuses the controller instance when the same element leaves and re-enters the DOM (a Turbo cache restore, a form moved around the page). Every cycle added another layer, so the effective delay grew to N × `delayValue`. The wrapping now happens once, in `initialize()`.
