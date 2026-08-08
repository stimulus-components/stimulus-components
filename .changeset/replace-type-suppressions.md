---
"@stimulus-components/checkbox-select-all": patch
"@stimulus-components/rails-nested-form": patch
"@stimulus-components/dropdown": patch
"@stimulus-components/popover": patch
---

Replace the remaining `@ts-expect-error`/`@ts-ignore` comments with real types.

`EventTarget` casts stand in for the suppressions in `checkbox-select-all`, `dropdown` and `popover`. In `rails-nested-form` and `popover` the honest types surfaced a real `null` case — a remove button outside any wrapper, and a `currentTarget` that has already been cleared — which now returns early instead of raising a `TypeError`.
