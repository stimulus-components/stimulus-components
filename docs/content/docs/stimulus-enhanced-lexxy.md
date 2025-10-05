---
title: Enhanced Lexxy
description: A Stimulus controller that adds enhanced features to Lexxy editor.
package: enhanced-lexxy
packagePath: "@stimulus-components/enhanced-lexxy"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

::alert
This component is based on the [Basecamp's Lexxy editor](https://github.com/basecamp/lexxy){target="\_blank" .underline .hover:no-underline} library.
::

## Before starting

You must have Lexxy editor already running. This controller does not include Lexxy itself, only the Stimulus controller to add enhanced features.

## Usage

::code-block{tabName="app/views/posts/_form.html.erb"}

```erb
<%= form_with model: @post do |form| %>
  <%= form.rich_text_area :content, data: { controller: "enhanced-lexxy" } %>
<% end %>
```

::

The controller will automatically handle file attachment validation for the Lexxy editor. It listens for file attachment events and validates the files based on the configured types and maximum size. If a file is invalid, it prevents the attachment and dispatches custom events.
The controller dispatches the following custom events:
- `stimulus-enhanced-lexxy:invalid-type`: Fired when a file is invalid due to its type. The event detail contains the file, allowed types and default message.
- `stimulus-enhanced-lexxy:invalid-size`: Fired when a file is invalid due to its size. The event detail contains the file, maximum size and default message.


## Configuration

| Attribute                      | Default                     | Description                                                                 | Optional |
| ------------------------------ | --------------------------- | --------------------------------------------------------------------------- | -------- |
| `data-enhanced-lexxy-types-value`       | `["image/jpeg", "image/png", "application/pdf"]` | Allowed file types for attachment (MIME types).                              | ✅       |
| `data-enhanced-lexxy-max-bytes-value`   | `5 * 1024 * 1024`                | Maximum file size for attachments in bytes (5MB default).                   | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/enhanced_lexxy_controller.js"}

```js
import EnhancedLexxy from "stimulus-enhanced-lexxy"

export default class extends EnhancedLexxy {
  static values = {
    types: {
      type: Array,
      default: ["image/jpeg", "image/png", "application/pdf"], // You can change the default allowed types here.
    },
    maxBytes: {
      type: Number,
      default: 5 * 1024 * 1024, // You can change the default max file size here (in bytes).
    },
  }

  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```
