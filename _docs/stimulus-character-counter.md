---
layout: component
title: Character Counter
package: character-counter
netlify_id: 7ef669f5-d255-4a59-8461-5b2360d1674b
parent: Components list
---

A Stimulus controller that counts the number of characters in any input fields.

## Installation

```bash
$ yarn add stimulus-character-counter
```

And use it in your JS file:
```js
// Probably in app/javascript/controllers/index.js

import { Application } from "stimulus"
import CharacterCounter from "stimulus-character-counter"

const application = Application.start()
application.register("character-counter", CharacterCounter)
```

{% include demo.md %}

## Usage

In your view:
```html
<div data-controller="character-counter">
  <textarea data-character-counter-target="input"></textarea>

  <p>
    There are <strong data-character-counter-target="counter"></strong> characters in this textarea.
  </p>
</div>
```

## 🎛 Extending Controller

{% capture content %}
```js
import CharacterCounter from "stimulus-character-counter"

export default class extends CharacterCounter {
  connect() {
    super.connect()
    console.log("Do what you want here.")

    this.count // Will return the number of characters in the input/texterea.
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
