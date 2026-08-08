---
"stimulus-textarea-autogrow": patch
---

Remove the `input` listener on disconnect.

`connect()` registered an `input` listener on the textarea and a `resize` listener on the window, but `disconnect()` only removed the `resize` one. The textarea kept calling `autogrow` on a dead controller, and reconnecting the same element stacked a second listener on top.

This adds the package's first spec.
