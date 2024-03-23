---
title: Notification
description: A Stimulus controller for showing notifications.
package: notification
packagePath: '@stimulus-components/notification'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

This controller uses [stimulus-use/use-transition](https://stimulus-use.github.io/stimulus-use/#/use-transition) under the hood. You can change the animation behavior as you want.

## Usage

::code-block{tabName="app/views/index.html"}

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

::

You can hide the notification by default and open it programmatically.
Use a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events) and set the correct `value` and `action`.

For instance:

::code-block{tabName="app/views/index.html"}

```html
<div
  data-controller="notification"
  data-notification-hidden-value="true"
  data-action="awesome@window->notification#show"
  class="transition transform duration-1000 hidden"
  data-transition-enter-from="opacity-0 translate-x-6"
  data-transition-enter-to="opacity-100 translate-x-0"
  data-transition-leave-from="opacity-100 translate-x-0"
  data-transition-leave-to="opacity-0 translate-x-6"
>
  <p>This alert will magically disappear!</p>

  <button data-action="notification#hide">Close</button>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const event = new CustomEvent('awesome')

    window.dispatchEvent(event)
  })
</script>
```

::

## Configuration

| Attribute                        | Default | Description                                                   | Optional |
| -------------------------------- | ------- | ------------------------------------------------------------- | -------- |
| `data-notification-delay-value`  | `3000`  | Delay in milliseconds before closing the notification.        | ✅       |
| `data-notification-hidden-value` | `false` | Hide the notification by default to open it programmatically. | ✅       |

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/notification_controller.js"}

```js
import Notification from '@stimulus-components/notification'

export default class extends Notification {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
::
