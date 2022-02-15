---
layout: component
title: Remote Rails
package: remote-rails
netlify_id: ac728feb-ab47-48c9-b178-bbc7ca0ddc53
parent: Components list
---

A Stimulus controller to handle [Rails UJS events](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#rails-ujs-event-handlers).

## Installation

```bash
$ yarn add stimulus-remote-rails
```

And use it in your JS file:
```js
// Probably in app/javascript/controllers/index.js

import { Application } from "@hotwired/stimulus"
import Remote from "stimulus-remote-rails"

const application = Application.start()
application.register("remote", Remote)
```

{% include demo.md %}

## Usage

In your controller:
```ruby
class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render @comment
    else
      render partial: 'comments/form', locals: { comment: @comment }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params
      .require(:comment)
      .permit(:content)
  end
end
```

In your view:
```ruby
<%= form_with model: @comment, data: { controller: 'remote', action: 'ajax:success->remote#append ajax:error->remote#replace' } do |f| %>
  <% if f.object.errors.any? %>
    <% f.object.errors.full_messages.each do |error| %>
      <p><%= error %></p>
    <% end %>
  <% end %>

  <%= f.label :content %>
  <%= f.text_field :content %>

  <%= f.submit 'Save comment' %>
<% end %>
```

With a `link_to`:
```ruby
<%= link_to 'Click me to append content', content_path, remote: true, data: { controller: 'remote', action: 'ajax:success->remote#append' } %>

<%= link_to 'Click me to prepend content', content_path, remote: true, data: { controller: 'remote', action: 'ajax:success->remote#prepend' } %>

<%= link_to 'Click me to replace content', content_path, remote: true, data: { controller: 'remote', action: 'ajax:success->remote#replace' } %>
```

You can use `append`, `prepend` or `replace` methods with the events of your choice.

**Don't forget to add the `remote: true` attribute in your `link_to`!**

You can use it with all [remote elements available in Rails UJS](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#remote-elements).

## 🎛 Extending Controller

{% capture content %}
```js
import Remote from "stimulus-remote-rails"

export default class extends Remote {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
