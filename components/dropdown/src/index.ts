import { Controller } from "@hotwired/stimulus"
import { useTransition } from "stimulus-use"

export default class Dropdown extends Controller {
  declare readonly menuTarget: HTMLElement
  declare toggleTransition: (event?: Event) => void
  declare leave: (event?: Event) => void
  declare transitioned: false

  static targets = ["menu"]

  connect(): void {
    useTransition(this, {
      element: this.menuTarget,
    })
  }

  toggle(): void {
    this.toggleTransition()
  }

  hide(event: Event): void {
    // @ts-expect-error
    if (!this.element.contains(event.target) && !this.menuTarget.classList.contains("hidden")) {
      this.leave()
    }
  }
}
