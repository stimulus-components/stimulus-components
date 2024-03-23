---
title: Places Autocomplete
description: A Stimulus controller for Google Places Autocomplete.
package: places-autocomplete
packagePath: 'stimulus-places-autocomplete'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

### Google Maps Callback

Load the Google Maps Api JavaScript in your `<head>`:

::code-block{tabName="app/views/index.html"}

```html
<head>
  <script
    src="https://maps.googleapis.com/maps/api/js?key={your_key_here}&libraries=places&callback=initAutocomplete"
    async=""
    defer=""
  ></script>
</head>
```

::

Define a callback to trigger the `PlacesAutocomplete` controller in your views:

::code-block{tabName="app/views/index.html"}

```js
window.initAutocomplete = function () {
  const event = new Event('google-maps-callback', {
    bubbles: true,
    cancelable: true,
  })

  window.dispatchEvent(event)
}
```

::

👉 Tip: You don't need this callback if you add the `<div>` asynchronously in your DOM.

## Usage

::code-block{tabName="app/views/index.html"}

```html
<div
  data-controller="places"
  data-action="google-maps-callback@window->places#initAutocomplete"
  data-places-country-value='["fr"]'
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

::

## Configuration

| Attribute                   | Default | Description                                                                                   | Optional |
| --------------------------- | ------- | --------------------------------------------------------------------------------------------- | -------- |
| `data-places-country-value` | `[]`    | Array of countries the autocomplete is restricted to. <br/>Must be parseable by `JSON.parse`. | ✅       |

If a target does not exist, it will be ignored.

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/places_autocomplete_controller.js"}

```js
import PlacesAutocomplete from 'stimulus-places-autocomplete'

export default class extends PlacesAutocomplete {
  connect() {
    super.connect()
    console.log('Do what you want here.')

    // The google.maps.places.Autocomplete instance.
    this.autocomplete
  }

  // You can override the `initAutocomplete` method here.
  initAutocomplete() {
    super.initAutocomplete()
  }

  // You can override the `placeChanged` method here.
  placeChanged() {
    super.placeChanged()
  }

  // You can set the Autocomplete options in this getter.
  get autocompleteOptions() {
    return {
      fields: ['address_components', 'geometry'],
    }
  }
}
```

::
::
