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

  toggle(event?: Event): void {
    this.itemTargets.forEach((item) => {
      item.classList.toggle(this.class)
    })

    const trigger = this.triggerFor(event)

    if (trigger) {
      trigger.setAttribute("aria-expanded", String(trigger.getAttribute("aria-expanded") !== "true"))
    }
  }

  show(event?: Event): void {
    this.itemTargets.forEach((item) => {
      item.classList.remove(this.class)
    })

    this.triggerFor(event)?.setAttribute("aria-expanded", "true")
  }

  hide(event?: Event): void {
    this.itemTargets.forEach((item) => {
      item.classList.add(this.class)
    })

    this.triggerFor(event)?.setAttribute("aria-expanded", "false")
  }

  // The element the action is attached to, but only when it declares an `aria-expanded` attribute.
  // The attribute stays opt-in: the controller keeps it in sync, it never adds it to a trigger that does not have it.
  private triggerFor(event?: Event): Element | null {
    const trigger = event?.currentTarget

    if (!(trigger instanceof Element) || !trigger.hasAttribute("aria-expanded")) return null

    return trigger
  }
}
