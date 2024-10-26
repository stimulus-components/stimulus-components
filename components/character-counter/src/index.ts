import { Controller } from "@hotwired/stimulus"

export default class CharacterCounter extends Controller {
  declare readonly counterTarget: HTMLElement
  declare readonly inputTarget: HTMLInputElement
  declare readonly hasCountdownValue: boolean

  static targets = ["input", "counter"]
  static values = { countdown: Boolean }

  initialize(): void {
    this.update = this.update.bind(this)
  }

  connect(): void {
    this.update()
    this.inputTarget.addEventListener("input", this.update)
  }

  disconnect(): void {
    this.inputTarget.removeEventListener("input", this.update)
  }

  update(): void {
    this.counterTarget.innerHTML = this.count.toString()
  }

  get count(): number {
    let value: number = this.inputTarget.value.length

    if (this.hasCountdownValue) {
      if (this.maxLength < 0) {
        console.error(
          `[stimulus-character-counter] You need to add a maxlength attribute on the input to use countdown mode. The current value is: ${this.maxLength}.`,
        )
      }

      value = Math.max(this.maxLength - value, 0)
    }

    return value
  }

  get maxLength(): number {
    return this.inputTarget.maxLength
  }
}
