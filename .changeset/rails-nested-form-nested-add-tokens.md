---
"@stimulus-components/rails-nested-form": minor
---

Give each nesting level its own `NEW_RECORD` token, so multi-level nesting (a record whose own template adds records of its own, like a question with choices) resolves correctly.

`add()` replaced every `NEW_RECORD` token across the whole template's HTML with one shared id. When a template contained a nested `<template>` of its own, every level sharing the literal string `NEW_RECORD` was ambiguous: an id meant for this level and an id meant for the descendant could both appear in the same attribute value (an attribute that includes both nesting levels, like a choice's `name` spelling out its question's index too), and a single shared token can't tell them apart. Depending on exactly how the replace landed, this showed up as either the descendant's placeholder getting consumed early — so a second record added underneath reused the same frozen index and collapsed onto the first on submit — or the descendant's own id getting reused for the parent's slot too, attaching it to a record that was never actually created.

Added a `newRecordToken` value (default `"NEW_RECORD"`, so existing single-level usage needs no changes) so each nesting level can declare its own distinct token via `data-nested-form-new-record-token-value`. `add()` now replaces only its own configured token, but does so across the entire template string, descendant templates included — this level's token can legitimately recur deep inside a descendant's own markup and needs resolving there too, while a descendant's differently-named token is left untouched for its own later `add()` call.
