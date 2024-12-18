import { Controller } from "@hotwired/stimulus"

export default class Confirmation extends Controller<HTMLFormElement> {
  declare inputTargets: HTMLInputElement[]
  declare itemTargets: HTMLInputElement[] | HTMLButtonElement[]

  static targets = ["input", "item"]

  check(): void {
    const disabled = this.inputTargets.some((input) => {
      if (input.type === "checkbox") {
        return input.checked === false
      }

      return input.dataset.confirmationContent !== input.value
    })

    this.itemTargets.forEach((target) => {
      target.disabled = disabled
    })
  }
}
