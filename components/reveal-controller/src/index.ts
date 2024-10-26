import { Controller } from "@hotwired/stimulus"

export default class Reveal extends Controller {
  declare hasHiddenClass: boolean
  declare hiddenClass: string
  declare itemTargets: HTMLElement[]
  declare class: string

  static targets = ["item"]
  static classes = ["hidden"]

  connect(): void {
    this.class = this.hasHiddenClass ? this.hiddenClass : "hidden"
  }

  toggle(): void {
    this.itemTargets.forEach((item) => {
      item.classList.toggle(this.class)
    })
  }

  show(): void {
    this.itemTargets.forEach((item) => {
      item.classList.remove(this.class)
    })
  }

  hide(): void {
    this.itemTargets.forEach((item) => {
      item.classList.add(this.class)
    })
  }
}
