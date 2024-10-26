import { Controller } from "@hotwired/stimulus"

export default class PasswordVisibility extends Controller {
  declare hasHiddenClass: boolean
  declare hiddenClass: string
  declare class: string
  declare hidden: boolean
  declare inputTarget: HTMLInputElement
  declare iconTargets: HTMLElement[]

  static targets = ["input", "icon"]
  static classes = ["hidden"]

  connect(): void {
    this.hidden = this.inputTarget.type === "password"
    this.class = this.hasHiddenClass ? this.hiddenClass : "hidden"
  }

  toggle(e: Event): void {
    e.preventDefault()

    this.inputTarget.type = this.hidden ? "text" : "password"
    this.hidden = !this.hidden

    this.iconTargets.forEach((icon) => icon.classList.toggle(this.class))
  }
}
