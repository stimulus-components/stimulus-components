---
layout: component
title: Checkbox Select All
parent: Available controllers
package: checkbox-select-all
netlify_id: 073b5fee-358d-4dbf-b807-52034690f8ef
tests: true
---

A Stimulus controller for managing checkbox lists.

## Video Tutorial

[Chris Oliver](https://twitter.com/excid3) from [GoRails](https://gorails.com/) has released a presentation video on how to use this package with a real life example with Ruby on Rails.

👉 Take a look: [Bulk Operations in Rails](https://gorails.com/episodes/bulk-operations-in-rails)

{% include youtube.html id="koTokt6xwG8" %}

## Installation

```bash
$ yarn add stimulus-checkbox-select-all
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import CheckboxSelectAll from "stimulus-checkbox-select-all"

const application = Application.start()
application.register("checkbox-select-all", CheckboxSelectAll)
```

{% include demo.md %}

## Usage

### Without Rails

```html
<table>
  <tbody>
    <td class="block">
      <label>
        <input type="checkbox" data-checkbox-select-all-target="checkboxAll" />
        <span>Select All / Deselect All</span>
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
  </tbody>
</table>
```

### With Rails

In your models:
```ruby
class User < ApplicationRecord
  has_many :teams
end

class Team < ApplicationRecord
  belongs_to :user
end
```

In your controller:
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

In your view:
```html
<%= form_with model: @user, data: { controller: 'checkbox-select-all' } do |f| %>
  <label>
    <input type="checkbox" data-checkbox-select-all-target="checkboxAll" />
    <span>Select All / Deselect All</span>
  </label>

  <%= f.collection_check_boxes :team_ids, Team.all, :id, :name do |b| %>
    <%= b.label do %>
      <%= b.check_box data: { target_checkbox_select_all: 'checkbox' } %>
      <%= b.text %>
    <% end %>
  <% end %>
<% end %>
```

## 🎛 Extending Controller

{% capture content %}
```js
import CheckboxSelectAll from "stimulus-checkbox-select-all"

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
{% endcapture %}

{% include extending_controller.md content=content %}
