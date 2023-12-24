---
title: Character Counter
description: A Stimulus controller that counts the number of characters in any input fields.
package: character-counter
---

## Installation

```bash
$ yarn add stimulus-character-counter
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from 'stimulus'
import CharacterCounter from 'stimulus-character-counter'

const application = Application.start()
application.register('character-counter', CharacterCounter)
```

:demo-link{package-name="character-counter"}

## Usage

In your view:

```html
<div data-controller="character-counter">
  <textarea data-character-counter-target="input"></textarea>

  <p>
    There are
    <strong data-character-counter-target="counter"></strong> characters in this textarea.
  </p>
</div>
```

You can use it in countdown mode, add the correct value and a `maxlength` attribute on the `input`/`textarea` field:

```html
<div data-controller="character-counter" data-character-counter-countdown-value="true">
  <textarea data-character-counter-target="input" maxlength="280"></textarea>

  <p>
    There are
    <strong data-character-counter-target="counter"></strong> characters remaining.
  </p>
</div>
```

## 🛠 Configuration

| Attribute                                | Default     | Description                  | Optional |
| ---------------------------------------- | ----------- | ---------------------------- | -------- |
| `data-character-counter-countdown-value` | `undefined` | Activate the countdown mode. | ✅       |

## 🎛 Extending Controller

::extending-controller

```js
import CharacterCounter from 'stimulus-character-counter'

export default class extends CharacterCounter {
  connect() {
    super.connect()
    console.log('Do what you want here.')

    this.count // Will return the number of characters in the input/texterea.
  }
}
```

::
