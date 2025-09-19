---
title: Lexxy
description: A Stimulus controller that adds enhanced features to Lexxy editor.
package: lexxy
packagePath: "@stimulus-components/lexxy"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

::alert
This component is based on the [Basecamp's Lexxy editor](https://github.com/basecamp/lexxy){target="\_blank" .underline .hover:no-underline} library.
::

## Before starting

You must have Lexxy editor already running. This controller does not include Lexxy itself, only the Stimulus controller to add file attachment validation.

## Usage

::code-block{tabName="app/views/posts/_form.html.erb"}

```erb
<%= form_with model: @post do |form| %>
  <%= form.rich_text_area :content, data: { controller: "lexxy" } %>
<% end %>
```

::

The controller will automatically handle file attachment validation for the Lexxy editor. It listens for file attachment events and validates the files based on the configured types and maximum size. If a file is invalid, it prevents the attachment and dispatches custom events.
The controller dispatches the following custom events:
- `lexxy:invalid-type`: Fired when a file is invalid due to its type. The event detail contains the file, allowed types and default message.
- `lexxy:invalid-size`: Fired when a file is invalid due to its size. The event detail contains the file, maximum size and default message.


## Configuration

| Attribute                      | Default                     | Description                                                                 | Optional |
| ------------------------------ | --------------------------- | --------------------------------------------------------------------------- | -------- |
| `data-lexxy-types-value`       | `["image/jpeg", "image/png", "application/pdf"]` | Allowed file types for attachment (MIME types).                              | ✅       |
| `data-lexxy-max-bytes-value`   | `5242880`                | Maximum file size for attachments in bytes (5MB default).                   | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/lexxy_controller.js"}

```js
import Lexxy from "stimulus-lexxy"

export default class extends Lexxy {
  static values = {
    types: {
      type: Array,
      default: ["image/jpeg", "image/png", "application/pdf"], // You can change the default allowed types here.
    },
    maxBytes: {
      type: Number,
      default: 5242880, // You can change the default max file size here (in bytes).
    },
  }

  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```
