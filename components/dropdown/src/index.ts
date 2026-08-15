import { Controller } from "@hotwired/stimulus"
import { useTransition } from "stimulus-use"

export default class Dropdown extends Controller {
  declare readonly menuTarget: HTMLElement
  declare readonly hasButtonTarget: boolean
  declare readonly buttonTarget: HTMLElement
  declare toggleTransition: (event?: Event) => void
  declare leave: (event?: Event) => void
  declare transitioned: boolean

  static targets = ["menu", "button"]

  connect(): void {
    useTransition(this, {
      element: this.menuTarget,
    })

    this.syncExpanded()
  }

  toggle(): void {
    this.toggleTransition()
    this.syncExpanded()
  }

  hide(event: Event): void {
    if (!this.element.contains(event.target as Node) && !this.menuTarget.classList.contains("hidden")) {
      this.leave()
      this.syncExpanded()
    }
  }

  // `useTransition` flips `transitioned` synchronously, before the enter and leave
  // animations resolve, so the attribute never lags behind the state of the menu.
  private syncExpanded(): void {
    if (!this.hasButtonTarget) return

    this.buttonTarget.setAttribute("aria-expanded", String(this.transitioned))
  }
}
