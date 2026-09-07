import { Controller } from "@hotwired/stimulus"

export default class RadioUncheckApp extends Controller {
  declare hasRadioTarget: boolean
  declare radioTargets: HTMLInputElement[]

  static targets = ["radio"]

  uncheck(): void {
    if (!this.hasRadioTarget) return

    this.radioTargets.forEach((radio) => {
      radio.checked = false
      radio.dispatchEvent(new Event("change", { bubbles: true }))
    })
  }
}
