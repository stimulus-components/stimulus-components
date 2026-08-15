---
"@stimulus-components/checkbox-select-all": minor
---

Never toggle disabled checkboxes, and add a `ignoreDisabled` value to control how they count in the indeterminate state.

`toggle()` wrote `checked` on every checkbox target, including the disabled ones. A user cannot change a disabled checkbox and the browser does not submit it, so the `checkboxAll` target must not change it either. It now toggles only the enabled checkbox targets. Closes #110, and ports stimulus-components/stimulus-checkbox-select-all#10.

That leaves the question raised in the review of that PR: what the `checkboxAll` target must show when a disabled checkbox keeps a different state. It is now an option, like `disableIndeterminate`:

- by default, the disabled checkboxes still count, so the `checkboxAll` target stays indeterminate after a "Select All" click when one disabled checkbox is unchecked;
- with `data-checkbox-select-all-ignore-disabled-value="true"`, only the checkboxes that the `checkboxAll` target can change are counted, and the indeterminate state disappears when all the enabled checkboxes are checked.

Two related changes make this work:

- `toggle()` now calls `refresh()`. The checkbox targets do not emit a `change` event when the controller writes their `checked` property, so the state of the `checkboxAll` target was never computed again after a click. Without disabled checkboxes this changes nothing, because the recomputed state matches the state the browser already applied.
- The `checked` property of the `checkboxAll` target now counts only the enabled checkbox targets, so a click always toggles them. Counting the disabled ones there made the control show a selection it could not clear: with all the enabled checkboxes unchecked and one disabled checkbox checked, every click was read as "deselect all" and the enabled checkboxes could never be checked again. The `indeterminate` property still counts the disabled checkboxes, unless `ignoreDisabled` is set.

Adds `enabled` and `disabled` getters, next to `checked` and `unchecked`.
