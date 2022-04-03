---
title: Prefetch
description: A Stimulus controller that prefetch in-viewport links.
package: prefetch
netlify_id: d3b878bb-b10c-47d2-a21b-e0a510120a4c
---

## Installation

```bash
$ yarn add stimulus-prefetch
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import Prefetch from 'stimulus-prefetch'

const application = Application.start()
application.register('prefetch', Prefetch)
```

<DocsDemoLink package-name="prefetch"></DocsDemoLink>

## Usage

```html
<a href="/about" data-controller="prefetch">About</a>.
```

**Note**: To improve performance, links will only be prefetched if they are in the viewport and if the user isn't on a slow connection.

## 🎛 Extending Controller

<DocsExtendingController>

```js
import Prefetch from 'stimulus-prefetch'

export default class extends Prefetch {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

</DocsExtendingController>
