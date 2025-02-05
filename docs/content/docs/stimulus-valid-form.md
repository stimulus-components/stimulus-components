---
title: Valid Form
description: A Stimulus controller to improve user experience when filling out a form by providing direct feedback when the form is valid.
package: valid-form
packagePath: "@stimulus-components/valid-form"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath" controllerName="valid-form"}

## Example

:valid-form

## Usage

To use the Valid Form component, simply add `data-controller="valid-form"` to the `form` tag. The component will automatically find the validation attributes on the form elements, such as `required`, `minlength`, or `maxlength` in the fields of the form.

**The submit button will be dynamically enabled once all the fields validate successfully.**

Read more: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation#using_built-in_form_validation)

::code-block{tabName="app/views/index.html"}

```html
<form action="/" data-controller="valid-form">
  <select required>
    <option value="" disabled selected>Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>

  <input required minlength="4" maxlength="8" />

  <input type="checkbox" required />

  <input type="submit" />
</form>
```

::

## Events

| Method          | Description                         |
| --------------- | ----------------------------------- |
| `onValidated`   | Called when the form turns valid.   |
| `onInvalidated` | Called when the form turns invalid. |

## Extending Controller

::extending-controller
You can override or extend the functionality by overriding **onValidated/onInvalidated** methods.

::code-block{tabName="app/javascript/controllers/valid_form_controller.js"}

```js
import ValidForm from "@stimulus-components/valid-form"

export default class extends ValidForm {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
  onValidated() {
    // When the form becomes valid, this method is called.
  }
  onInvalidated() {
    // When the form becomes invalid, this method is called.
  }
}
```

::
::
