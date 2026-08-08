---
title: Character Counter
description: A Stimulus controller that counts the number of characters in any input fields.
package: character-counter
packagePath: "@stimulus-components/character-counter"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Example

:character-counter

## Usage

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="character-counter">
  <textarea data-character-counter-target="input"></textarea>

  <p>
    There are
    <strong data-character-counter-target="counter"></strong> characters in this textarea.
  </p>
</div>
```

::

You can use it in countdown mode, add the correct value and a `maxlength` attribute on the `input`/`textarea` field:

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="character-counter" data-character-counter-countdown-value="true">
  <textarea data-character-counter-target="input" maxlength="280"></textarea>

  <p>
    There are
    <strong data-character-counter-target="counter"></strong> characters remaining.
  </p>
</div>
```

::

By default, characters are counted as UTF-16 code units, the same unit the browser uses to enforce `maxlength`. Emojis and other multibyte characters then count as more than one character. Use the count unit value to count Unicode code points, or graphemes so that a composed emoji such as 👨‍👩‍👧‍👦 counts as a single character:

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="character-counter" data-character-counter-count-unit-value="graphemes">
  <textarea data-character-counter-target="input"></textarea>

  <p>
    There are
    <strong data-character-counter-target="counter"></strong> characters in this textarea.
  </p>
</div>
```

::

Grapheme counting relies on [`Intl.Segmenter`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter); on browsers without it, the controller falls back to counting code points. Note that `maxlength` is still enforced by the browser in code units, so in countdown mode a counter using another unit will not reach zero at the same time as the browser stops accepting input.

## Configuration

| Attribute                                 | Default      | Description                                                           | Optional |
| ----------------------------------------- | ------------ | --------------------------------------------------------------------- | -------- |
| `data-character-counter-countdown-value`  | `undefined`  | Activate the countdown mode.                                          | ✅       |
| `data-character-counter-count-unit-value` | `code-units` | How characters are counted: `code-units`, `code-points`, `graphemes`. | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/character_counter_controller.js"}

```js
import CharacterCounter from "@stimulus-components/character-counter"

export default class extends CharacterCounter {
  connect() {
    super.connect()
    console.log("Do what you want here.")

    this.count // Will return the number of characters in the input/texterea.
  }
}
```

::
::
