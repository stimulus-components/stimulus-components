---
"@stimulus-components/rails-nested-form": patch
---

Keep a nested template's own token intact when its parent is added.

`add()` replaced every `NEW_RECORD` token across the whole template's HTML with one `replace`. When a template contained a nested `<template>` of its own — a record whose own template adds records of its own, like a question with choices — that one replace also overwrote the nested template's placeholder, since it's just more text in the same string. Every record added underneath the newly-added parent afterward then had no token left to replace, so it reused the parent's now-frozen index and collapsed onto the same key on submit. `add()` now rewrites `name`/`id`/`for` attributes on the parsed DOM instead of regexing the raw string, so nested `<template>` content — which lives in its own inert document fragment — is left untouched.
