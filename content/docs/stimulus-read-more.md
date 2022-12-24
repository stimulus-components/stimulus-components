---
title: Read More
description: A Stimulus controller to show more or less text.
package: read-more
---

## Installation

```bash
$ yarn add stimulus-read-more
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import ReadMore from 'stimulus-read-more'

const application = Application.start()
application.register('read-more', ReadMore)
```

<DocsDemoLink package-name="read-more"></DocsDemoLink>

## Usage

This controller is based on the [Line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp) CSS property.

It will update the CSS variable `--read-more-line-clamp` on the element with the value `'unset'` to show all the content.

In your CSS:

```css
.my-content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--read-more-line-clamp, 2);
}
```

In this case, `--read-more-line-clamp` is `undefined` and `2` is the number of lines displayed by default.

In your view:

```html
<div
  data-controller="read-more"
  data-read-more-more-text-value="Read more"
  data-read-more-less-text-value="Read less"
>
  <p class="my-content" data-read-more-target="content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam.
  </p>

  <button data-action="read-more#toggle">Read more</button>
</div>
```

## 🛠 Configuration

| Attribute                        | Default     | Description                        | Optional |
| -------------------------------- | ----------- | ---------------------------------- | -------- |
| `data-read-more-more-text-value` | `undefined` | Text to display to show more text. | ✅       |
| `data-read-more-less-text-value` | `undefined` | Text to display to show less text. | ✅       |

## 🎛 Extending Controller

<DocsExtendingController>

```js
import ReadMore from 'stimulus-read-more'

export default class extends ReadMore {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }

  // Function to override on toggle.
  toggle(event) {}

  // Function to override when the text is shown.
  show(event) {}

  // Function to override when the text is hidden.
  hide(event) {}
}
```

</DocsExtendingController>
