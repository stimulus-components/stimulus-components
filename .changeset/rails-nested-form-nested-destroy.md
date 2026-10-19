---
"@stimulus-components/rails-nested-form": patch
---

Flag the removed entry for destruction when its wrapper contains a nested form.

`remove()` set `_destroy` on the first `_destroy` input in the wrapper's subtree. When the wrapper's own `_destroy` input came after a nested form, as in the documented example, that input belonged to the first nested entry: the removed entry was hidden but not destroyed. It now only considers `_destroy` inputs whose closest wrapper is the removed one.
