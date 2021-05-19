---
layout: component
title: Places Autocomplete
parent: Available controllers
package: places-autocomplete
netlify_id: 5454560c-391d-41f8-92e1-8a3ee026dbe1
---

A Stimulus controller for Google Places Autocomplete.

## Installation

```bash
$ yarn add stimulus-places-autocomplete
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import PlacesAutocomplete from "stimulus-places-autocomplete"

const application = Application.start()
application.register("places", PlacesAutocomplete)
```

### Google Maps Callback

Load the Google Maps Api JavaScript in your `<head>`:
```html
<head>
  <script
    src="https://maps.googleapis.com/maps/api/js?key={your_key_here}&libraries=places&callback=initAutocomplete"
    async=""
    defer=""
  ></script>
</head>
```

Define a callback to trigger the `PlacesAutocomplete` controller in your views:
```js
window.initAutocomplete = function () {
  const event = new Event('google-maps-callback', { bubbles: true, cancelable: true })
  window.dispatchEvent(event)
}
```

## Usage

```html
<div
  data-controller="places"
  data-action="google-maps-callback@window->places#initAutocomplete"
>

  <input
    type="text"
    data-action="keydown->places#preventSubmit"
    data-places-target="address"
    placeholder="Search a location"
  />

  <input type="hidden" data-places-target="city" />
  <input type="hidden" data-places-target="streetNumber" />
  <input type="hidden" data-places-target="route" />
  <input type="hidden" data-places-target="county" />
  <input type="hidden" data-places-target="state" />
  <input type="hidden" data-places-target="postalCode" />
  <input type="hidden" data-places-target="country" />

  <input type="hidden" data-places-target="longitude" />
  <input type="hidden" data-places-target="latitude" />
</div>
```

## Configuration

If a target does not exist, it will be ignored.

## 🎛 Extending Controller

{% capture content %}
```js
import PlacesAutocomplete from "stimulus-places-autocomplete"

export default class extends PlacesAutocomplete {
  connect() {
    super.connect()
    console.log("Do what you want here.")

    // The google.maps.places.Autocomplete instance.
    this.autocomplete
  }

  // You can override the `initAutocomplete` method here.
  initAutocomplete () {
    super.initAutocomplete()
  }

  // You can override the `placeChanged` method here.
  placeChanged () {
    super.placeChanged()
  }

  // You can set the Autocomplete options in this getter.
  get autocompleteOptions () {
    return {
      fields: ['address_components']
    }
  }
}
```
{% endcapture %}

{% include extending_controller.md content=content %}
