## 🧪 Quick example

Here is an example of how to use [Stimulus Character Counter](/docs/stimulus-character-counter).

### 1. Install the package:

::code-block{tabName="Terminal"}

```bash
$ yarn add @stimulus-components/character-counter
```

::

### 2. Import it in your application:

::code-block{tabName="app/javascript/controllers/index.js"}

```js
import { Application } from '@hotwired/stimulus'
import CharacterCounter from '@stimulus-components/character-counter'

const application = Application.start()
application.register('character-counter', CharacterCounter)
```

::

### 3. Use it in your views

::code-block{tabName="app/views/index.html"}

```erb
<div data-controller="character-counter">
  <textarea data-character-counter-target="input"></textarea>

  <p>
    There are
    <strong data-character-counter-target="counter"></strong>
    characters in this textarea.
  </p>
</div>
```

::

### 4. Try it

:character-counter

### 5. Enjoy! 🎉

It is as easy as that.
