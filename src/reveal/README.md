# Toggle Controller

This controller toggle a class on one or multiple items to show or hide them.

## Installation

```bash
$ yarn add stimulus-components
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import { Reveal } from "stimulus-components"

const application = Application.start()
application.register("reveal", Reveal)
```

## Usage

### Toggle
```html
<div data-controller="reveal" data-hidden-class="hidden">
  <button data-action="click->reveal#toggle" type="button" class="btn">
    Toggle me!
  </button>

  <p data-target="reveal.item" class="hidden mt-4">Hey 👋</p>
  <p data-target="reveal.item" class="hidden mt-4">You can have multiple items</p>
</div>
```

### Show
```html
<div data-controller="reveal">
  <button data-action="click->reveal#show" type="button" class="btn">
    Show me!
  </button>

  <p data-target="reveal.item" class="hidden mt-4">Hey 👋</p>
</div>
```

### Hide
```html
<div data-controller="reveal">
  <button data-action="click->reveal#hide" type="button" class="btn">
    Hide me!
  </button>

  <p data-target="reveal.item" class="mt-4">Hey 👋</p>
</div>
```

## Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-hidden-class` | `hidden` | CSS class to toggle | ✅ |
