---
"@stimulus-components/reveal": minor
---

Keep the `aria-expanded` attribute of the trigger in sync with the state of the items.

`toggle`, `show` and `hide` now read the event and write `aria-expanded` on the element the action is attached to: `toggle` flips it, `show` sets it to `true`, `hide` sets it to `false`. A screen reader could not tell whether the items were shown or hidden before. Closes #105, and ports stimulus-components/stimulus-reveal-controller#11.

The attribute is opt-in, which is the difference with that pull request: the controller only writes it when the trigger already declares it, so it never adds `aria-expanded` to an element that is not a control for the items. Existing markup is unchanged until an `aria-expanded` attribute is added to the trigger.

The three methods take an optional event parameter, so calling them without one, from a subclass or from another controller, still works.
