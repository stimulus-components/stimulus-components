# Textarea Autogrow Controller

Simple controller for autogrowing textarea. Textareas will match the height of their content.

## Installation

```bash
$ yarn add stimulus-components
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import { TextareaAutogrow } from "stimulus-components"

const application = Application.start()
application.register("textarea-autogrow", TextareaAutogrow)
```

## Usage

In your view:
```html
<textarea data-controller="textarea-autogrow">
Very long text here.
</textarea>

<textarea
  data-controller="textarea-autogrow"
  data-textarea-autogrow-resize-debounce-delay="500"
>
Very long text here.
</textarea>
```

## Configuration

The height is calculated on window resize to match the content height.

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-textarea-autogrow-resize-debounce-delay` | `100` | Delay before autogrow on resize in milliseconds (0 to disable). | ✅ |
