---
title: Sortable
description: A Stimulus controller to reorder lists with drag-and-drop.
package: sortable
packagePath: '@stimulus-components/sortable'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath" extraPackages="sortablejs @rails/request.js"}

::alert
This component is based on the [SortableJS](https://github.com/SortableJS/sortablejs){target="\_blank" .underline .hover:no-underline}.
::

## Usage

::code-block{tabName="app/models/todo.rb"}

```ruby
class Todo < ApplicationRecord
  acts_as_list # Or with a custom position system.
end
```

::

::code-block{tabName="app/controllers/todos_controller.rb"}

```ruby
class TodosController < ApplicationController
  def update
    # Do what you want with todo_params.
  end

  private

  def todo_params
    params.require(:todo).permit(:position)
  end
end
```

::

In your views:

### Basic usage

::code-block{tabName="app/views/index.html"}

```html
<ul data-controller="sortable" data-sortable-animation-value="150">
  <li>Pet the cat</li>
  <li>Get the groceries</li>
</ul>
```

::

### With custom handler

::code-block{tabName="app/views/index.html"}

```html
<ul data-controller="sortable" data-sortable-handle-value=".handle">
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

::

### With AJAX call

If you're using [@rails/request.js](https://github.com/rails/request.js) in your application, you can add an url as data-attribute on every items to perform an AJAX call to update the new position automatically on drop.

::code-block{tabName="app/views/index.html"}

```erb
<ul data-controller="sortable" data-sortable-resource-name-value="todo">
  <%= @todos.each do |todo| %>
    <!-- <li data-sortable-update-url="/todos/1">Pet the cat</li> -->
    <li data-sortable-update-url="<%= todo_path(todo) %>"><%= todo.description %></li>
  <% end %>
</ul>
```

::

By default, `position` will be used as param in a PATCH request. You can change it with the `data-sortable-param-name-value` attribute.

If you use `data-sortable-resource-name-value`, the name will be used. For instance, `todo[position]`.

## Configuration

| Attribute                           | Default     | Description                                                                | Optional |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------- | -------- |
| `data-sortable-resource-name-value` | `undefined` | Name of the resource to use as AJAX param.                                 | ✅       |
| `data-sortable-param-name-value`    | `position`  | Name of the attribute to use as AJAX param.                                | ✅       |
| `data-sortable-response-kind-value` | `html`      | The response kind you want for `@rails/request.js`.                        | ✅       |
| `data-sortable-animation-value`     | `150`       | Animation speed moving items when sorting in milliseconds. `0` to disable. | ✅       |
| `data-sortable-handle-value`        | `undefined` | Drag handle selector within list items.                                    | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/sortable_controller.js"}

```js
import Sortable from 'stimulus-sortable'

export default class extends Sortable {
  connect() {
    super.connect()
    console.log('Do what you want here.')

    // The sortable.js instance.
    this.sortable

    // Your options
    this.options

    // Your default options
    this.defaultOptions
  }

  // You can override the `onUpdate` method here.
  onUpdate(event) {
    super.onUpdate(event)
  }

  // You can set default options in this getter for all sortable elements.
  get defaultOptions() {
    return {
      animation: 500,
    }
  }
}
```

::
::
