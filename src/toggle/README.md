# Toggle Controller

This controller toggle a class on one or multiple items to show or hide them.

## Installation

```bash
$ yarn add stimulus-components
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import { Toggle } from "stimulus-components"

const application = Application.start()
application.register("toggle", Toggle)
```

## Usage

```html
<div data-controller="toggle" data-hidden-class="hidden">
  <button data-action="click->toggle#toggle" type="button" class="btn">
    Toggle me!
  </button>

  <p data-target="toggle.item" class="hidden mt-4">Hey 👋</p>
  <p data-target="toggle.item" class="hidden mt-4">You can have multiple items</p>
</div>
```

## Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-hidden-class` | `hidden` | CSS class to toggle | ✅ |
