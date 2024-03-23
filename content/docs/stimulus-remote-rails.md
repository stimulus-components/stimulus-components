---
title: Remote Rails
description: A Stimulus controller to handle Rails UJS events.
package: remote-rails
packagePath: '@stimulus-components/remote-rails'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath" controllerName="remote"}

## Usage

::code-block{tabName="app/controllers/comments_controller.rb"}

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

::

::code-block{tabName="app/views/comments/edit.html.erb"}

```erb
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

::

With a `link_to`:

::code-block{tabName="app/views/comments/index.html.erb"}

```erb
<%= link_to 'Click me to append content', content_path, remote: true, data: { controller: 'remote', action: 'ajax:success->remote#append' } %>

<%= link_to 'Click me to prepend content', content_path, remote: true, data: { controller: 'remote', action: 'ajax:success->remote#prepend' } %>

<%= link_to 'Click me to replace content', content_path, remote: true, data: { controller: 'remote', action: 'ajax:success->remote#replace' } %>
```

::

You can use `append`, `prepend` or `replace` methods with the events of your choice.

**Don't forget to add the `remote: true` attribute in your `link_to`!**

You can use it with all [remote elements available in Rails UJS](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#remote-elements).

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/remote_rails_controller.js"}

```js
import Remote from 'stimulus-remote-rails'

export default class extends Remote {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
::
