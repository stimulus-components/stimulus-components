---
"@stimulus-components/dropdown": minor
---

Keep the `aria-expanded` attribute of the button in sync with the state of the menu.

The controller accepts a new `button` target, the element that opens the menu. When it is present, `connect`, `toggle` and `hide` write `aria-expanded` on it: `true` once the menu opens, `false` once it closes, whether it is closed from the button, from an item inside the menu, or by a click outside. A screen reader could not tell whether the menu was open or closed before. The markup in the documentation also points the button at the menu with `aria-controls`, which completes the [ARIA disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).

The attribute comes from the synchronous `transitioned` flag of `useTransition`, not from the classes of the menu, so it never drifts while the leave transition plays. `connect` also corrects a value that does not match the initial state of the menu.

The target is optional: without it the controller writes no attribute, so existing markup is unchanged.
