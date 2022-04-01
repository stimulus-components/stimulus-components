---
title: Rails Autosave
description: A Stimulus controller to autosubmit Rails forms.
package: rails-autosave
netlify_id: d3b878bb-b10c-47d2-a21b-e0a510120a4c
---

## Before starting

You must have [@rails/ujs](https://github.com/rails/rails/tree/master/actionview/app/assets/javascripts) up and running **before** using this controller.

```bash
$ yarn add @rails/ujs
```

Somewhere in your JS file:

```js
import Rails from '@rails/ujs'

Rails.start()
```

## Installation

```bash
$ yarn add stimulus-rails-autosave
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import Autosave from 'stimulus-rails-autosave'

const application = Application.start()
application.register('autosave', Autosave)
```

## Usage

```erb
<%= form_with model: @todo, data: { controller: 'autosave', autosave_delay_value: '1000' } do |f| %>
  <div class="field">
    <%= f.label :description %>

    <!-- With custom event! -->
    <%= f.text_field :description, data: { action: 'keyup->autosave#save' } %>
  </div>

  <div class="field">
    <%= f.label :completed %>
    <%= f.check_box :completed, data: { action: 'autosave#save' } %>
  </div>

  <%= f.submit %>
<% end %>
```

## 🛠 Configuration

| Attribute                   | Default | Description                                           | Optional |
| --------------------------- | ------- | ----------------------------------------------------- | -------- |
| `data-autosave-delay-value` | `0`     | Delay before actually submit the form. (0 to disable) | ✅       |

## 🎛 Extending Controller

<DocsExtendingController>

```js
import Autosave from 'stimulus-rails-autosave'

export default class extends Autosave {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

</DocsExtendingController>
