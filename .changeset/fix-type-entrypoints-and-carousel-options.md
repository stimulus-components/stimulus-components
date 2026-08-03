---
"@stimulus-components/auto-submit": patch
"@stimulus-components/scroll-progress": patch
"@stimulus-components/carousel": patch
"stimulus-places-autocomplete": patch
---

Fix broken package entrypoints and a wrong exported type.

- `auto-submit` and `scroll-progress` pointed `types` at a file that was never emitted (their declarations land under `dist/types/components/<name>/src/` because they import the shared `utils/` helpers), so consumers got no types at all.
- `places-autocomplete` pointed `module` at `dist/stimulus-places-autocomplete.es.js`, a filename Vite no longer emits; it is now `.mjs`.
- `carousel` typed its `options` value as the Swiper **class** (`import type SwiperOptions from "swiper"` resolves to the default export, not the options interface). It now uses the real `SwiperOptions` from `swiper/types`.
