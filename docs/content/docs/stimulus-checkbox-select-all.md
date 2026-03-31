---
title: Checkbox Select All
description: A Stimulus controller for managing checkbox lists.
package: checkbox-select-all
packagePath: "@stimulus-components/checkbox-select-all"
---

## Video Tutorial

[Chris Oliver](https://twitter.com/excid3) from [GoRails](https://gorails.com/) has released a presentation video on how to use this package with a real life example with Ruby on Rails.

👉 Take a look: [Bulk Operations in Rails](https://gorails.com/episodes/bulk-operations-in-rails)

:Youtube{id="koTokt6xwG8"}

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Example

:checkbox-select-all

## Usage

### Without Rails

::code-block{tabName="app/views/index.html.erb"}

```html
<table
  data-controller="checkbox-select-all"
  data-checkbox-select-all-checked-text-value="Unselect all"
  data-checkbox-select-all-unchecked-text-value="Select all"
>
  <tbody>
    <tr>
      <td class="block">
        <label>
          <input type="checkbox" data-checkbox-select-all-target="checkboxAll" />
          <span data-checkbox-select-all-target="label">Select all</span>
        </label>
      </td>

      <td class="block">
        <label>
          <input type="checkbox" data-checkbox-select-all-target="checkbox" value="1" />
          <span>Team 1</span>
        </label>
      </td>

      <td class="block">
        <label>
          <input type="checkbox" data-checkbox-select-all-target="checkbox" checked="checked" value="2" />
          <span>Team 2</span>
        </label>
      </td>

      <td class="block">
        <label>
          <input type="checkbox" data-checkbox-select-all-target="checkbox" value="3" />
          <span>Team 3</span>
        </label>
      </td>
    </tr>
  </tbody>
</table>
```

::

Add `data-checkbox-select-all-target="label"` plus the two text values only if you want the select-all label to update automatically. If you leave them out, the controller still manages the checkbox state without changing any label text.

### With Rails

In your models:

::code-block{tabName="app/models/user.rb"}

```ruby
class User < ApplicationRecord
  has_many :teams
end
```

::

::code-block{tabName="app/models/team.rb"}

```ruby
class Team < ApplicationRecord
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
         team_ids: []
       )
  end
end
```

::

::code-block{tabName="app/views/index.html"}

```erb
<%= form_with model: @user, data: {
  controller: 'checkbox-select-all',
  checkbox_select_all_checked_text_value: 'Unselect all',
  checkbox_select_all_unchecked_text_value: 'Select all'
} do |f| %>
  <label>
    <input type="checkbox" data-checkbox-select-all-target="checkboxAll" />
    <span data-checkbox-select-all-target="label">Select all</span>
  </label>

  <%= f.collection_check_boxes :team_ids, Team.all, :id, :name do |b| %>
    <%= b.label do %>
      <%= b.check_box data: { checkbox_select_all_target: 'checkbox' } %>
      <%= b.text %>
    <% end %>
  <% end %>
<% end %>
```

::

## Configuration

| Attribute                                              | Default | Description                                          | Optional |
| ------------------------------------------------------ | ------- | ---------------------------------------------------- | -------- |
| `data-checkbox-select-all-disable-indeterminate-value` | `false` | Disable the indeterminate state.                     | ✅       |
| `data-checkbox-select-all-checked-text-value`          | -       | Text used when the select-all checkbox is checked.   | ✅       |
| `data-checkbox-select-all-unchecked-text-value`        | -       | Text used when the select-all checkbox is unchecked. | ✅       |

`data-checkbox-select-all-target="label"` is optional and marks the element whose text should change.

In the default indeterminate mode, a partial selection uses the checked label text.

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/checkbox_select_all_controller.js"}

```js
import CheckboxSelectAll from "@stimulus-components/checkbox-select-all"

export default class extends CheckboxSelectAll {
  connect() {
    super.connect()
    console.log("Do what you want here.")

    // Get all checked checkboxes
    this.checked

    // Get all unchecked checkboxes
    this.unchecked
  }
}
```

::
::
