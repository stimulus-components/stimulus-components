import { Controller } from "@hotwired/stimulus"

export default class RailsNestedForm extends Controller {
  declare targetTarget: HTMLElement
  declare templateTarget: HTMLElement
  declare wrapperSelectorValue: string
  declare newRecordPlaceholderValue: string

  static targets = ["target", "template"]
  static values = {
    wrapperSelector: {
      type: String,
      default: ".nested-form-wrapper",
    },
    newRecordPlaceholder: {
      type: String,
      default: "NEW_RECORD",
    },
  }

  add(e: Event): void {
    e.preventDefault()

    // @ts-expect-error
    const content: string = this.templateTarget.innerHTML.replaceAll(
      this.newRecordPlaceholderValue,
      new Date().getTime().toString(),
    )
    this.targetTarget.insertAdjacentHTML("beforebegin", content)

    const event = new CustomEvent("rails-nested-form:add", { bubbles: true })
    this.element.dispatchEvent(event)
  }

  remove(e: Event): void {
    e.preventDefault()

    // @ts-expect-error
    const wrapper: HTMLElement = e.target.closest(this.wrapperSelectorValue)

    if (wrapper.dataset.newRecord === "true") {
      wrapper.remove()
    } else {
      wrapper.style.display = "none"

      const input: HTMLInputElement = wrapper.querySelector("input[name*='_destroy']")
      input.value = "1"
    }

    const event = new CustomEvent("rails-nested-form:remove", { bubbles: true })
    this.element.dispatchEvent(event)
  }
}
