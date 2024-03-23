# Installation

How to install dependencies and structure your app.
Each controller is a npm package and must be installed individually.

**All controllers are created with the same convention**.

All packages export two versions of the controller, a `UMD (Universal Module Definition)` and a `mjs` version.
In the `mjs` version, the controller will always be the default export.

In the `UMD` version, the controller's class will be available in camelCase in the [window](https://developer.mozilla.org/en-US/docs/Web/API/Window) global variable.
For instance, for `@stimulus-components/character-counter`, you will get `window.StimulusCharacterCounter`.

You can install the controllers in a few different ways.

## 1. With a modules bundler (Vite, Webpack, esbuild, etc.)

Because the controller's class is the default export, you can import it with the name of your choice.

Install the package:

::code-block{tabName="Terminal"}

```bash
$ yarn add @stimulus-components/character-counter
```

::

Load it in your JavaScript:

::code-block{tabName="app/javascript/controllers/index.js"}

```js
import { Application } from '@hotwired/stimulus'

// import HelloController from "./controllers/hello_controller"
import CharacterCounter from '@stimulus-components/character-counter'

const application = Application.start()

// application.register("hello", HelloController)
application.register('character-counter', CharacterCounter)
```

::

See: [Official Stimulus installation guide with this approach](https://stimulus.hotwired.dev/handbook/installing#using-other-build-systems).

## 2. With [import-maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) in Rails

Add the package in your `importmap.rb` configuration file:

::code-block{tabName="Terminal"}

```bash
$ bin/importmap pin @stimulus-components/character-counter
```

::

Load it in your JavaScript:

::code-block{tabName="app/javascript/controllers/index.js"}

```js
import { Application } from '@hotwired/stimulus'

// import HelloController from "./controllers/hello_controller"
import CharacterCounter from '@stimulus-components/character-counter'

window.Stimulus = Application.start()

// Stimulus.register("hello", HelloController)
Stimulus.register('character-counter', CharacterCounter)
```

::

See: [Official Stimulus installation guide with this approach](https://github.com/hotwired/stimulus-rails/#with-import-map).

::alert
Note that importmaps don't work well with external dependencies. And it does not work with CSS at all. So, use it wisely.
::

## 3. With Sprockets

Make sure to add `node_modules` folder as load path in your Rails configuration:

::code-block{tabName="config/initializers/assets.rb"}

```ruby
Rails.application.config.assets.paths << Rails.root.join('node_modules')
```

::

Install the package:

::code-block{tabName="Terminal"}

```bash
$ yarn add @stimulus-components/character-counter
```

::

Load the `UMD` version of the package:

::code-block{tabName="app/assets/javascripts/index.js"}

```js
//= require @hotwired/stimulus/dist/stimulus.umd
//= require @stimulus-components/character-counter/dist/stimulus-character-counter.umd

const application = Stimulus.Application.start()

application.register('character-counter', window.StimulusCharacterCounter)
```

::

## 4. With CDN

Load the `UMD` version of the package:

::code-block{tabName="app/views/index.html"}

```html
<head>
  <script src="https://unpkg.com/stimulus/dist/stimulus.umd.js"></script>
  <script src="https://unpkg.com/@stimulus-components/character-counter/dist/stimulus-character-counter.umd.js"></script>

  <script>
    const application = Stimulus.Application.start()

    application.register('character-counter', window.StimulusCharacterCounter)
  </script>
</head>
```

::
