---
title: Popover
description: A Stimulus controller to deal with HTML popover.
package: popover
netlify_id: cbec1815-8e5b-4f45-8cb2-44d24e8c9cf5
---

## Installation

```bash
$ yarn add stimulus-popover
```

And use it in your JS file:

```js
// Probably in app/javascript/controllers/index.js

import { Application } from '@hotwired/stimulus'
import Popover from 'stimulus-popover'

const application = Application.start()
application.register('popover', Popover)
```

<DocsDemoLink package-name="popover"></DocsDemoLink>

## Usage

### With remote content

In your controller:

```ruby
class UsersController < ApplicationController
  def card
    render partial: 'users/card', locals: { user: @user }
  end
end
```

In your routes:

```ruby
Rails.application.routes.draw do
ressources
  get :card, to: 'users#card'
end
```

In your view:

With server rendered content on the fly:

```erb
<div data-controller="popover" data-popover-url-value="<%= card_path %>">
  You can load popover with AJAX. For instance, this is my
  <a href="/profile" data-action="mouseenter->popover#show mouseleave->popover#hide">profile card</a>
</div>
```

In the card partial `app/views/users/_card.html.erb`:

```html
<div data-popover-target="card">
  <p>This content is loaded with AJAX.</p>
</div>
```

### With local template

```html
<div data-controller="popover">
  This is my Github card available on
  <a href="/profile" data-action="mouseenter->popover#show mouseleave->popover#hide"> Github </a>

  <template data-popover-target="content">
    <div data-popover-target="card">
      <p>This content is in a hidden template.</p>
    </div>
  </template>
</div>
```

## Configuration

| Attribute                | Default     | Description               | Optional |
| ------------------------ | ----------- | ------------------------- | -------- |
| `data-popover-url-value` | `undefined` | URL to fetch the content. | ✅       |

**Important note**: It's up to **you** to provide the popover style!

## 🎛 Extending Controller

<DocsExtendingController>

```js
import Popover from 'stimulus-popover'

export default class extends Popover {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

</DocsExtendingController>
