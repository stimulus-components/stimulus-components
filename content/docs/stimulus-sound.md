---
title: Sound
description: A Stimulus Controller to play and control sound.
package: sound
packagePath: '@stimulus-components/sound'
---

## Installation

:installation-block{:package="package" :packagePath="packagePath"}

## Usage

::code-block{tabName="app/views/index.html"}

```html
<div data-controller="sound" data-sound-url-value="/path/to/your/sound.mp3">
  <button type="button" data-action="sound#play">▶️ Play</button>
  <button type="button" data-action="sound#pause">⏸️ Pause</button>
  <button type="button" data-action="sound#reset">⏹️ Reset</button>
  <button type="button" data-action="sound#muted" data-sound-muted-param="true">🔇 Mute</button>
  <button type="button" data-action="sound#muted" data-sound-muted-param="false">🔈 Unmute</button>
  <button type="button" data-action="sound#loop" data-sound-loop-param="true">🔁 Loop</button>
  <button type="button" data-action="sound#volume" data-sound-volume-param="1">🔊 Volume to 100%</button>
  <button type="button" data-action="sound#volume" data-sound-volume-param="0.25">🔉 Volume to 25%</button>
</div>
```

::

## Extending Controller

::extending-controller
::code-block{tabName="app/javascript/controllers/sound_controller.js"}

```js
import Sound from 'stimulus-sound'

export default class extends Sound {
  connect() {
    super.connect()
    console.log('Do what you want here.')

    // The HTMLAudioElement instance.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
    // You can fetch any attribute on it if needed.
    this.sound
  }
}
```

::
::
