---
layout: component
title: Stimulus popover
parent: Available controllers
package: popover
netlify_id: cbec1815-8e5b-4f45-8cb2-44d24e8c9cf5
---

A Stimulus controller to deal with HTML popover.

## Installation

```bash
$ yarn add stimulus-popover
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import Popover from "stimulus-popover"

const application = Application.start()
application.register("popover", Popover)
```

{% include demo.md %}

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
```html
<div
  data-controller="popover"
  data-popover-url="<%= card_path %>"
>
  You can load popover with AJAX. For instance, this is my
  <a
    href="/profile"
    data-action="mouseover->popover#show mouseout->popover#hide"
  >
    profile card
  </a>
</div>
```

In the card partial `app/views/users/_card.html.erb`:
```html
<div data-target="popover.card">
  <p>This content is loaded with AJAX.</p>
</div>
```

### With local template

```html
<div data-controller="popover">
  This is my Github card available on
  <a
    href="/profile"
    data-action="mouseover->popover#show mouseout->popover#hide"
  >
    Github
  </a>

  <template data-target="popover.content">
    <div data-target="popover.card">
      <p>This content is in a hidden template.</p>
    </div>
  </template>
</div>
```

## Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-popover-url` | `undefined` | URL to fetch the content. | ✅ |

**Important note**: It's up to **you** to provide the popover style!

## 🎛 Extending Controller

{% capture content %}
```js
import Timeago from "stimulus-timeago"
import { fr } from 'date-fns/locale'

export default class extends Timeago {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
