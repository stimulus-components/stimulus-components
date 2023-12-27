---
title: Glow
description: A Stimulus controller that add a mouse-tracing glow effect.
package: glow
---

## Installation

```bash
$ yarn add stimulus-glow
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import Glow from 'stimulus-glow'

const application = Application.start()
application.register('glow', Glow)
```

:demo-link{package-name="glow"}

## Usage

WIP

## 🎛 Extending Controller

::extending-controller

```js
import Glow from 'stimulus-glow'

export default class extends Glow {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
