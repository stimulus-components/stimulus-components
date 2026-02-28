---
title: Speech Recognition
description: A Stimulus controller that uses the Web Speech API to capture speech and fill an input.
package: speech-recognition
packagePath: "@stimulus-components/speech-recognition"
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

::alert
This component uses the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API){target="\_blank" .underline .hover:no-underline}. Support and accuracy depend on the browser and may require a secure context (HTTPS).
::

## Example

:speech-recognition

## Usage

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="speech-recognition">
  <textarea data-speech-recognition-target="input" placeholder="Click Start and speak..."></textarea>

  <button
    type="button"
    data-speech-recognition-target="startButton"
    data-action="speech-recognition#start"
    class="hidden"
  >
    Start
  </button>

  <button
    type="button"
    data-speech-recognition-target="stopButton"
    data-action="speech-recognition#stop"
    class="hidden"
  >
    Stop
  </button>

  <span data-speech-recognition-target="indicator" class="hidden">Recording...</span>
</div>
```

::

The controller shows it only when the browser supports the `Web Speech API`. When the API is not supported, the `start` button, `stop` button, and `indicator` stay hidden.

## Configuration

| Attribute                              | Default  | Description                                                | Optional |
| -------------------------------------- | -------- | ---------------------------------------------------------- | -------- |
| `data-speech-recognition-hidden-class` | `hidden` | CSS class toggled to show/hide start, stop, and indicator. | ✅       |

Recognition runs with `continuous: true` and `interimResults: true`.

The full transcript (all results joined) is written to the input on each result.

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/speech_recognition_controller.js"}

```js
import SpeechRecognitionController from "@stimulus-components/speech-recognition"

export default class extends SpeechRecognitionController {
  connect() {
    super.connect()
    console.log("Speech recognition controller connected.")
  }
}
```

::
::
