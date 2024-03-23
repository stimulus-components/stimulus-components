---
title: Auto Submit
description: A Stimulus controller to auto-submit forms.
package: auto-submit
packagePath: '@stimulus-components/auto-submit'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath" controllerName="auto-submit"}

## Usage

::code-block{tabName="app/views/todos/edit.html.erb"}

```erb
<%= form_with model: @todo, data: { controller: 'auto-submit' } do |f| %>
  <div class="field">
    <%= f.label :description %>

    <!-- With custom event! -->
    <%= f.text_field :description, data: { action: 'keyup->auto-submit#submit' } %>
  </div>

  <div class="field">
    <%= f.label :completed %>
    <%= f.check_box :completed, data: { action: 'auto-submit#submit' } %>
  </div>

  <%= f.submit %>
<% end %>
```

::

## Configuration

| Attribute                      | Default | Description                                                   | Optional |
| ------------------------------ | ------- | ------------------------------------------------------------- | -------- |
| `data-auto-submit-delay-value` | `150`   | Delay (in ms) before actually submit the form. (0 to disable) | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/auto_submit_controller.js"}

```js
import AutoSubmit from 'stimulus-auto-submit'

export default class extends AutoSubmit {
  static values = {
    delay: {
      type: Number,
      default: 1000, // You can change the default delay here.
    },
  }

  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
::
