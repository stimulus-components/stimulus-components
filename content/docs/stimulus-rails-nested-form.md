---
title: Rails Nested Form
description: A Stimulus controller to create new fields on the fly to populate your Rails relationship with accepts_nested_attributes_for.
package: rails-nested-form
packagePath: '@stimulus-components/rails-nested-form'
---

[Nested attributes](https://apidock.com/rails/ActiveRecord/NestedAttributes/ClassMethods) allow you to save attributes on associated records through the parent.

## Installation

:installation-block{:package="package" :packagePath="packagePath" controllerName="nested-form"}

## Usage

In your models:

::code-block{tabName="app/models/user.rb"}

```ruby
class User < ApplicationRecord
  has_many :todos
  accepts_nested_attributes_for :todos, reject_if: :all_blank, allow_destroy: true
end

class Todo < ApplicationRecord
  belongs_to :user
end
```

::

In your controller:

::code-block{tabName="app/controllers/users_controller.rb"}

```ruby
class UsersController < ApplicationController
  def update
    if user.update(user_params)
      redirect_to users_path
    else
      render :edit
    end
  end

  private

  def user_params
    params
      .require(:user)
       .permit(
         todos_attributes: [:id, :_destroy, :description]
       )
  end
end
```

::

To DRY up the code, we extract the fields in a partial called `todo_form` to use it in the [template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) with a new `Todo` and in the default `fields_for`.

::code-block{tabName="app/views/users/edit.html.erb"}

```erb
<%= form_with model: @user, data: { controller: 'nested-form', nested_form_wrapper_selector_value: '.nested-form-wrapper' } do |f| %>
  <template data-nested-form-target="template">
    <%= f.fields_for :todos, Todo.new, child_index: 'NEW_RECORD' do |todo_fields| %>
      <%= render "todo_form", f: todo_fields %>
    <% end %>
  </template>

  <%= f.fields_for :todos do |todo_fields| %>
    <%= render "todo_form", f: todo_fields %>
  <% end %>

  <!-- Inserted elements will be injected before that target. -->
  <div data-nested-form-target="target"></div>

  <button type="button" data-action="nested-form#add">Add todo</button>

  <%= f.submit 'Save todos' %>
<% end %>
```

::

::code-block{tabName="app/views/users/\_todo_form.html.erb"}

```erb
<div class="nested-form-wrapper" data-new-record="<%= f.object.new_record? %>">
  <%= f.label :description %>
  <%= f.text_field :description %>

  <button type="button" data-action="nested-form#remove">Remove todo</button>

  <%= f.hidden_field :_destroy %>
</div>
```

::

As explained in the [documentation](https://apidock.com/rails/ActionView/Helpers/FormHelper/fields_for), we need to specify the `child_index` and replace its value in JavaScript because the index needs to be unique for each fields.

## Configuration

| Attribute                                 | Default                | Description                   | Optional |
| ----------------------------------------- | ---------------------- | ----------------------------- | -------- |
| `data-nested-form-wrapper-selector-value` | `.nested-form-wrapper` | Selector to find the wrapper. | ✅       |

The remove feature is completely optional.

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/rails_nested_form_controller.js"}

```js
import NestedForm from '@stimulus-components/rails-nested-form'

export default class extends NestedForm {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
::
