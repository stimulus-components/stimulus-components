---
"@stimulus-components/scroll-to": patch
---

Use `window.scrollY` instead of the deprecated `window.pageYOffset`.

The two are defined as aliases, so this is a rename with no behaviour change.
