# Stimulus components

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/guillaumebriday)
[![](https://img.shields.io/npm/dt/stimulus-components.svg)](https://www.npmjs.com/package/stimulus-components)
[![](https://img.shields.io/npm/v/stimulus-components.svg)](https://www.npmjs.com/package/stimulus-components)
[![](https://github.com/guillaumebriday/stimulus-components/workflows/Lint/badge.svg)](https://github.com/guillaumebriday/stimulus-components)
[![](https://github.com/guillaumebriday/stimulus-components/workflows/Test/badge.svg)](https://github.com/guillaumebriday/stimulus-components)
[![](https://img.shields.io/github/license/guillaumebriday/stimulus-components.svg)](https://github.com/guillaumebriday/stimulus-components)
[![Netlify Status](https://api.netlify.com/api/v1/badges/056dda4a-4444-4c24-a854-c4b1944d35ca/deploy-status)](https://stimulus-components.netlify.com)

## Getting started

This library is a set of multiple [Stimulus controllers](https://stimulusjs.org/).

## Installation

This library supports [tree-shaking](https://webpack.js.org/guides/tree-shaking/) so you can import **only the controllers you need**.

```bash
$ yarn add stimulus-components
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import { Toggle } from "stimulus-components"

const application = Application.start()
application.register("toggle", Toggle)
```

## Basic Usage

See [Demo](https://stimulus-components.netlify.app/).

Documentation is available as README in [controllers folders](https://github.com/guillaumebriday/stimulus-components/tree/master/src).

## Development

### Project setup
```bash
$ yarn install
$ yarn dev
```

### Tests

[Jest](https://jestjs.io/) and [Puppeteer](https://github.com/puppeteer/puppeteer) are responsible to test this component:
```bash
$ yarn test
```

### Linter
[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are responsible to lint and format this component:
```bash
$ yarn lint
$ yarn format
```

## Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## License

This project is released under the [MIT](http://opensource.org/licenses/MIT) license.
