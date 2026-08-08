---
"@stimulus-components/timeago": patch
---

Type `refreshTimer` as `ReturnType<typeof setInterval>` and drop the `@ts-ignore`.

The field was declared `number`, which only matches the DOM `setInterval`, so the assignment needed a suppression to compile against Node's typings. The inferred type works under both, and the suppression is gone.
