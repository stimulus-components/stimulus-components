---
title: Rails Autosave
description: A Stimulus controller to autosubmit Rails forms.
package: rails-autosave
---

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
