import { Controller } from "@hotwired/stimulus"

export default class RailsNestedForm extends Controller {
  declare targetTarget: HTMLElement
  declare templateTarget: HTMLElement
  declare wrapperSelectorValue: string
  declare newRecordTokenValue: string

  static targets = ["target", "template"]
  static values = {
    wrapperSelector: {
      type: String,
      default: ".nested-form-wrapper",
    },
    newRecordToken: {
      type: String,
      default: "NEW_RECORD",
    },
  }

  // When a template contains a descendant nested-form template of its own
  // (a record whose own template adds records of its own, e.g. a question
  // with choices), every level sharing the literal token "NEW_RECORD" is
  // ambiguous: an id meant for this level and an id meant for the
  // descendant can both appear in the same attribute value (an attribute
  // that includes both nesting levels, like a choice's name attribute
  // including its question's index too), and a single shared token can't
  // tell them apart. Give each nesting level its own distinct token via
  // newRecordTokenValue instead, so replacing only this level's own token
  // is unambiguous even across the entire template string -- descendant
  // templates included, since this level's token can legitimately recur
  // deep inside a descendant's own markup and needs resolving there too,
  // while the descendant's differently-named token is left untouched for
  // its own later add() call.
  add(e: Event): void {
    e.preventDefault()

    const id = new Date().getTime().toString()
    const content = this.templateTarget.innerHTML.split(this.newRecordTokenValue).join(id)
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
}
