# Stimulus Hotkey

## Getting started

A Stimulus controller to trigger click or focus on the element when a keyboard shortcut is pressed. Based on [Basecamp's fizzy hotkey controller](https://github.com/basecamp/fizzy/blob/main/app/javascript/controllers/hotkey_controller.js).

Bind key events in HTML with Stimulus actions (e.g. `keydown.enter@document->hotkey#click` or `keydown.enter@document->hotkey#focus`). The controller ignores key presses when the event target is inside an `input`, `textarea`, or `lexxy-editor`, so users can type normally in form fields.

## 📚 Documentation

See [stimulus-hotkey documentation](https://www.stimulus-components.com/docs/stimulus-hotkey/).

## 👷‍♂️ Contributing

Do not hesitate to contribute to the project by adapting or adding features! Bug reports or pull requests are welcome.

## 📝 License

This project is released under the [MIT](http://opensource.org/licenses/MIT) license.
