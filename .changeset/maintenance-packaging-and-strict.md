---
"@stimulus-components/animated-number": patch
"@stimulus-components/auto-submit": patch
"@stimulus-components/carousel": patch
"@stimulus-components/character-counter": patch
"@stimulus-components/chartjs": patch
"@stimulus-components/checkbox-select-all": patch
"@stimulus-components/clipboard": patch
"@stimulus-components/color-picker": patch
"@stimulus-components/confirmation": patch
"@stimulus-components/content-loader": patch
"@stimulus-components/dialog": patch
"@stimulus-components/dropdown": patch
"@stimulus-components/hotkey": patch
"@stimulus-components/lightbox": patch
"@stimulus-components/notification": patch
"@stimulus-components/password-visibility": patch
"@stimulus-components/popover": patch
"@stimulus-components/prefetch": patch
"@stimulus-components/rails-nested-form": patch
"@stimulus-components/read-more": patch
"@stimulus-components/remote-rails": patch
"@stimulus-components/reveal": patch
"@stimulus-components/scroll-progress": patch
"@stimulus-components/scroll-reveal": patch
"@stimulus-components/scroll-to": patch
"@stimulus-components/sortable": patch
"@stimulus-components/sound": patch
"@stimulus-components/speech-recognition": patch
"@stimulus-components/timeago": patch
"stimulus-glow": patch
"stimulus-places-autocomplete": patch
"stimulus-textarea-autogrow": patch
---

Packaging: publish only the built `dist/` (via a new `files` allowlist), build automatically before publish with a `prepack` hook, and flag packages as `sideEffects: false` so bundlers can tree-shake them. Also hardens controllers under TypeScript `strict` mode.
