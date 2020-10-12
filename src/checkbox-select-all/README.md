# Checkbox Select All Controller

This controller is useful

## Installation

```bash
$ yarn add stimulus-components
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import { CheckboxSelectAll } from "stimulus-components"

const application = Application.start()
application.register("checkbox-select-all", CheckboxSelectAll)
```

## Usage

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
    <input type="checkbox" data-action="change->checkbox-select-all#toggleAll" />
    <span>Select All / Deselect All</span>
  </label>

  <%= f.collection_check_boxes :team_ids, Team.all, :id, :name do |b| %>
    <%= b.label do %>
      <%= b.check_box data: { target: 'checkbox-select-all.checkbox' } %>
      <%= b.text %>
    <% end %>
  <% end %>
<% end %>
```
