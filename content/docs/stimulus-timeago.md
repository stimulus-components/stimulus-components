---
title: Timeago
description: A Stimulus controller that returns the distance between the given date and now in words.
package: timeago
packagePath: '@stimulus-components/timeago'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

::alert
This component is based on the [date-fns/formatDistanceToNow](https://date-fns.org/v2.2.1/docs/formatDistanceToNow){target="\_blank" .underline .hover:no-underline}.
::

## Usage

::code-block{tabName="app/views/index.html"}

```html
<p>
  Stimulus 1.0.0 was released
  <time data-controller="timeago" data-timeago-datetime-value="2018-01-30T09:00"></time>.
</p>
```

::

## Configuration

| Attribute                             | Default     | Description                                                      | Optional |
| ------------------------------------- | ----------- | ---------------------------------------------------------------- | -------- |
| `data-timeago-datetime-value`         | `undefined` | String that can be parsed by `Date.parse()`.                     | ❌       |
| `data-timeago-refresh-interval-value` | `undefined` | Interval in milliseconds to reload the distance.                 | ✅       |
| `data-timeago-include-seconds-value`  | `false`     | Distances less than a minute are more detailed                   | ✅       |
| `data-timeago-add-suffix-value`       | `false`     | Result specifies if now is earlier or later than the passed date | ✅       |

`includeSeconds` and `addSuffix` are the options of the [date-fns/formatDistanceToNow](https://date-fns.org/v2.2.1/docs/formatDistanceToNow) method.

If the datetime string passed via `data-timeago-datetime-value` is not parseable by `Date.parse()` it will display the given value instead.

## Bonus

If you're using Rails, you can define this helper:

::code-block{tabName="app/helpers/application_helper.rb"}

```ruby
def timeago(date, format: :long)
  return if date.blank?

  content = I18n.l(date, format: format)

  tag.time(content,
            title: content,
            data: {
              controller: 'timeago',
              timeago_datetime_value: date.iso8601
            })
end
```

::

And use it in your html:

::code-block{tabName="app/views/index.html.erb"}

```erb
<p>Created <%= timeago(@project.created_at) %></p>
```

::

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/timeago_controller.js"}

```js
import Timeago from 'stimulus-timeago'
import { fr } from 'date-fns/locale'

export default class extends Timeago {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }

  // You can override this getter to change the locale.
  // Don't forget to import it.
  get locale() {
    return fr
  }
}
```

::
::
