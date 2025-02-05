import { Controller } from "@hotwired/stimulus"
type SubmitElement = HTMLInputElement | HTMLButtonElement
type ValidatableHtmlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export default class ValidForm extends Controller<HTMLFormElement> {
  private submitElement: SubmitElement | null = null
  private validatableElements: ValidatableHtmlElement[] = []

  connect(): void {
    this.setup()
    if (!this.isValidSetup()) {
      return
    }

    this.validateForm()
    this.element.addEventListener("input", this.listenFormChanges.bind(this))
  }

  listenFormChanges(event: Event): void {
    const target = event.target as ValidatableHtmlElement
    if (!this.validatableElements.includes(target)) {
      return
    }
    this.validateForm()
  }

  validateForm(): void {
    if (this.element.checkValidity()) {
      this.submitElement.disabled = false
    } else {
      this.submitElement.disabled = true
    }
  }
  disconnect(): void {
    this.element.removeEventListener("input", this.listenFormChanges.bind(this))
  }

  setup(): void {
    this.submitElement = this.element.querySelector('[type="submit"]')
    this.validatableElements = Array.from(this.element.querySelectorAll("input, textarea, select"))
      .filter(
        (el): el is ValidatableHtmlElement =>
          el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement,
      )
      .filter((el: ValidatableHtmlElement) => el.willValidate)
  }

  isValidSetup(): boolean {
    if (!this.validatableElements.length) {
      console.warn(
        "You're using Stimulus Components Valid form but your form does not contain any fields that contain validations",
      )
      return false
    }

    if (!this.submitElement) {
      console.warn("You're using Stimulus Components Valid Form but your form does not contain any submit element")
      return false
    }

    return true
  }
}
