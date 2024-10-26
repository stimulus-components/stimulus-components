import { Controller } from "@hotwired/stimulus"

export default class Sound extends Controller {
  declare readonly urlValue: string
  declare sound: HTMLAudioElement

  static values = {
    url: String,
  }

  connect() {
    this.sound = new Audio(this.urlValue)
  }

  play() {
    this.sound.play()
  }

  pause() {
    this.sound.pause()
  }

  reset() {
    this.sound.pause()
    this.sound.load()
  }

  volume({ params }) {
    this.sound.volume = params.volume
  }

  muted({ params }) {
    this.sound.muted = params.muted
  }

  loop({ params }) {
    this.sound.loop = params.loop
  }
}
