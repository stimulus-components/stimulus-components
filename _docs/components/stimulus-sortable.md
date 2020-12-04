---
layout: component
title: Sortable
parent: Available controllers
package: sortable
netlify_id: a8341029-7f19-443d-88aa-02c6325b389e
---

A Stimulus controller to reorder lists with drag-and-drop.

This controller is using [SortableJS](https://github.com/SortableJS/sortablejs) behind the scene.

## Installation

```bash
$ yarn add stimulus-sortable
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import Sortable from "stimulus-sortable"

const application = Application.start()
application.register("sortable", Sortable)
```

{% include demo.md %}

## Usage

In your model:
```ruby
class Todo < ApplicationRecord
  acts_as_list # Or with a custom position system.
end
```

In your controller:
```ruby
class TodosController < ApplicationController
  def update
    # Do what you want with todo_params.
  end

  private

  def todo_params
    params.permit(:position)
  end
end
```

In your views:
### Basic usage
```html
<ul
  data-controller="sortable"
  data-sortable-animation="150"
>
  <li>Pet the cat</li>
  <li>Get the groceries</li>
</ul>
```

### With custom handler
```html
<ul
  data-controller="sortable"
  data-sortable-handle=".handle"
>
  <li>
    <svg class="handle"></svg>
    Pet the cat
  </li>

  <li>
    <svg class="handle"></svg>
    Get the groceries
  </li>
</ul>
```

### With AJAX call

If you're using [Rails UJS](https://github.com/rails/rails/tree/master/actionview/app/assets/javascripts) in your application, you can add an url as data-attribute on every items to perform an AJAX call to update the new position.

```html
<ul
  data-controller="sortable"
  data-sortable-resource-name="todo"
>
  <%= @todos.each do |todo| %>
    <!-- <li data-sortable-update-url="/todos/1">Pet the cat</li> -->
    <li data-sortable-update-url="<%= todo_path(todo) %>"><%= todo.description %></li>
  <% end %>
</ul>
```

By default, `position` will be used as param in a PATCH request.

If you use `data-sortable-resource-name`, the name will be used. For instance, `todo[position]`.

## Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-sortable-resource-name` | `undefined` | Name of the resource to use as AJAX param. | ✅ |
| `data-sortable-animation` | `150` | Animation speed moving items when sorting in milliseconds. `0` to disable. | ✅ |
| `data-sortable-handle` | `undefined` | Drag handle selector within list items. | ✅ |

## 🎛 Extending Controller

{% capture content %}
```js
import Sortable from "stimulus-sortable"

export default class extends Sortable {
  connect() {
    super.connect()
    console.log("Do what you want here.")

    // The sortable.js instance.
    this.sortable

    // Your options
    this.options

    // Your default options
    this.defaultOptions
  }

  // You can override the `end` method here.
  end () {
    super.end()
  }

  // You can set default options in this getter for all sortable elements.
  get defaultOptions () {
    return {
      animation: 500
    }
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
