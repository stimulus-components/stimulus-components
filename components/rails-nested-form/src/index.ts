import { Controller } from "@hotwired/stimulus"

export default class RailsNestedForm extends Controller {
  declare targetTarget: HTMLElement
  declare templateTarget: HTMLElement
  declare wrapperSelectorValue: string

  static targets = ["target", "template"]
  static values = {
    wrapperSelector: {
      type: String,
      default: ".nested-form-wrapper",
    },
  }

  add(e: Event): void {
    e.preventDefault()

    const content: string = this.renderTemplate(new Date().getTime().toString())
    this.targetTarget.insertAdjacentHTML("beforebegin", content)

    const event = new CustomEvent("rails-nested-form:add", { bubbles: true })
    this.element.dispatchEvent(event)
  }

  remove(e: Event): void {
    e.preventDefault()

    const wrapper = (e.target as HTMLElement).closest<HTMLElement>(this.wrapperSelectorValue)

    if (!wrapper) return

    if (wrapper.dataset.newRecord === "true") {
      wrapper.remove()
    } else {
      wrapper.style.display = "none"

      const input = wrapper.querySelector<HTMLInputElement>("input[name*='_destroy']")
      if (input) input.value = "1"
    }

    const event = new CustomEvent("rails-nested-form:remove", { bubbles: true })
    this.element.dispatchEvent(event)
  }

  // A plain string replace would also rewrite the NEW_RECORD token of any
  // descendant nested-form template inside this one (a record whose own
  // template adds records of its own). Re-parsing into a <template> keeps
  // nested <template> content where it belongs: its content lives in a
  // separate, inert document fragment that isn't part of this one's normal
  // child tree, so walking the parsed DOM skips over it without having to
  // special-case it.
  private renderTemplate(id: string): string {
    const wrapper = document.createElement("template")
    wrapper.innerHTML = this.templateTarget.innerHTML

    wrapper.content.querySelectorAll("[name], [id], [for]").forEach((el) => {
      for (const attr of ["name", "id", "for"]) {
        const value = el.getAttribute(attr)
        if (value) el.setAttribute(attr, value.split("NEW_RECORD").join(id))
      }
    })

    return wrapper.innerHTML
  }
}
