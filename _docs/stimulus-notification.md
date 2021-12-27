---
layout: component
title: Notification
package: notification
netlify_id: 59cfd74d-6f17-4a80-b55c-535c901ad4e9
---

A Stimulus controller for showing notifications.

## Installation

```bash
$ yarn add stimulus-notification
```

And use it in your JS file:
```js
// Probably in app/javascript/controllers/index.js

import { Application } from "@hotwired/stimulus"
import Notification from "stimulus-notification"

const application = Application.start()
application.register("notification", Notification)
```

This controller uses [stimulus-use/use-transition](https://stimulus-use.github.io/stimulus-use/#/use-transition) under the hood. You can change the animation behavior as you want.

{% include demo.md %}

## Usage

In your view:
```html
<div
  data-controller="notification"
  data-notification-delay-value="2000"
  class="transition transform duration-1000 hidden"
  data-transition-enter-from="opacity-0 translate-x-6"
  data-transition-enter-to="opacity-100 translate-x-0"
  data-transition-leave-from="opacity-100 translate-x-0"
  data-transition-leave-to="opacity-0 translate-x-6"
>
  <p>This alert will magically disappear!</p>

  <button data-action="notification#hide">Close</button>
</div>
```

## 🛠 Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-notification-delay-value` | `3000` | Delay in milliseconds before closing the notification. | ✅ |


## 🎛 Extending Controller

{% capture content %}
```js
import Notification from "stimulus-notification"

export default class extends Notification {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
