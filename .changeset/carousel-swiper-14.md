---
"@stimulus-components/carousel": major
---

Update the `swiper` dependency from `^11.0.6` to `^14.0.0`.

Swiper 11 is affected by [GHSA-hmx5-qpq5-p643](https://github.com/advisories/GHSA-hmx5-qpq5-p643), fixed in Swiper 12.1. The old `^11.0.6` range held consumers on a vulnerable version and blocked them from upgrading Swiper in their own apps.

The controller itself is unchanged. Swiper 14 is a TypeScript rewrite with no runtime behaviour changes — every option, event, and method signature still behaves as it did in 11, and both `swiper/bundle` and `swiper/types` remain in its `exports` map. The CSS class names (`swiper`, `swiper-wrapper`, `swiper-slide`, …) are the same, so no markup needs to change.

This is a **major** bump because `swiper` is a runtime dependency and Swiper 14 raises the browser baseline to Chrome/Edge 110+, Safari 16.4+ (iOS 16.4+), and Firefox 110+. Code paths for older browsers were removed upstream. If you need to support browsers below that baseline, stay on `@stimulus-components/carousel@6`, which keeps Swiper 11.

Note that Swiper has no version 13; upstream skipped it, so 11 → 14 spans two majors.
