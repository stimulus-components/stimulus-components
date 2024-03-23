---
title: Glow
description: A Stimulus controller that add a mouse-tracing glow effect.
package: glow
packagePath: 'stimulus-glow'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## How it works

The concept of the effect is to clone an element, the overlay, and applying a [CSS mask](https://developer.mozilla.org/en-US/docs/Web/CSS/mask) with a `radia-gradiant` property that follow the mouse.

Every element that have a `glow` class will be revealed by the mask but not the rest.

## Usage

[TailwindCSS](https://tailwindcss.com/) is required to use this CSS, because we will use a [custom variant](https://tailwindcss.com/docs/plugins#adding-variants) to limit the glow effect to the overlay.

In your `tailwind.config.js` file, add this plugin:

::code-block{tabName="tailwind.config.js"}

```js
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  plugins: [
    plugin(
      ({ addVariant }) => {
        addVariant('glow', '.glow-capture .glow-overlay &')
      },
      {
        theme: {
          extend: {
            colors: {
              glow: 'color-mix(in srgb, var(--glow-color) calc(<alpha-value> * 100%), transparent)',
            },
          },
        },
      },
    ),
  ],
}
```

::

Now in your CSS, add this class:
::code-block{tabName="app/javascript/stylesheets/application.css"}

```css
.glow-overlay {
  --glow-size: 25rem; /* Change here the size of the glow effect */

  position: absolute;
  inset: 0;
  pointer-events: none;
  user-select: none;
  opacity: var(--glow-opacity, 0);
  mask: radial-gradient(
    var(--glow-size) var(--glow-size) at var(--glow-x) var(--glow-y),
    var(--glow-color) 1%,
    transparent 50%
  );
  transition: 400ms mask ease;
  will-change: mask;
}
```

::

Here is a simplified version of the minimum markup you need:

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="glow" class="relative glow-capture">
  <div data-glow-target="child" class="glow glow:ring-1 glow:border-glow glow:ring-glow glow:bg-glow/[.15]">
    <h2 class="font-bold text-2xl mb-4 text-gray-200 glow:text-glow/[.8]">Chicken Shawarma & Veggies</h2>

    <p class="text-sm text-gray-300 glow:text-glow">Vitae ducimus harum earum ratione autem esse ea!</p>

    <button class="glow:text-glow glow:border-glow glow:ring glow:ring-glow">Add to cart</button>
  </div>

  <div data-glow-target="overlay" class="glow-overlay" style="--glow-color: #f97316"></div>
</div>
```

::

I suggest you the inspect the [index.html](https://github.com/stimulus-components/stimulus-glow/blob/main/index.html) of the demo for a complete example.

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/glow_controller.js"}

```js
import Glow from 'stimulus-glow'

export default class extends Glow {
  connect() {
    super.connect()
    console.log('Do what you want here.')
  }
}
```

::
::
