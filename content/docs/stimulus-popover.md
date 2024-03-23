---
title: Popover
description: A Stimulus controller to deal with HTML popover.
package: popover
packagePath: '@stimulus-components/popover'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Usage

### With remote content

In your controller:

::code-block{tabName="app/controllers/users_controller.rb"}

```ruby
class UsersController < ApplicationController
  def card
    render partial: 'users/card', locals: { user: @user }
  end
end
```

::

In your routes:

::code-block{tabName="config/routes.rb"}

```ruby
Rails.application.routes.draw do
  get :card, to: 'users#card'
end
```

::

With server rendered content on the fly:

::code-block{tabName="app/views/index.html.erb"}

```erb
<div data-controller="popover" data-popover-url-value="<%= card_path %>">
  You can load popover with AJAX. For instance, this is my
  <a href="/profile" data-action="mouseenter->popover#show mouseleave->popover#hide">profile card</a>
</div>
```

::

In the card partial `app/views/users/_card.html.erb`:

::code-block{tabName="app/views/users/\_card.html.erb"}

```html
<div data-popover-target="card">
  <p>This content is loaded with AJAX.</p>
</div>
```

::

### With local template

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="popover">
  This is my GitHub card available on
  <a href="/profile" data-action="mouseenter->popover#show mouseleave->popover#hide"> GitHub </a>

  <template data-popover-target="content">
    <div data-popover-target="card">
      <p>This content is in a hidden template.</p>
    </div>
  </template>
</div>
```

::

## Configuration

| Attribute                | Default     | Description               | Optional |
| ------------------------ | ----------- | ------------------------- | -------- |
| `data-popover-url-value` | `undefined` | URL to fetch the content. | ✅       |

**Important note**: It's up to **you** to provide the popover style!

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/popover_controller.js"}

```js
import Popover from '@stimulus-components/popover'

export default class extends Popover {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
::
