---
"@stimulus-components/notification": patch
"@stimulus-components/clipboard": patch
---

Clear the pending timeout when the controller disconnects.

Both controllers scheduled a `setTimeout` and never cleared it on teardown, so an element removed inside the window — a Turbo navigation, a notification list re-rendered — left a callback to fire against a dead controller. `notification` then ran its whole `hide()` transition on a detached element; `clipboard` wrote `innerHTML` to a detached button.
