# Remote Controller

This controller handles Rails UJS event handlers in an easy way.

## Installation

```bash
$ yarn add stimulus-components
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import { Remote } from "stimulus-components"

const application = Application.start()
application.register("remote", Remote)
```

## Usage

In your controller:
```ruby
class UsersController < ApplicationController
  def update
    if user.update(user_params)
      redirect_to users_path
    else
      render partial: 'users/form', status: :unprocessable_entity
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:name)
  end
end
```

In your view:
```ruby
<%= form_with model: @user, data: { controller: 'remote', action: 'ajax:error->remote#replace' } do |f| %>
  <% if f.object.errors.any? %>
    <% f.object.errors.full_messages.each do |error| %>
      <p><%= error %></p>
    <% end %>
  <% end %>

  <%= f.label :name %>
  <%= f.text_field :name %>

  <%= f.submit 'Save user' %>
<% end %>
```

The whole form will be replaced in ajax but still server rendered.
