import { Controller } from "@hotwired/stimulus"
type SubmitElement = HTMLInputElement | HTMLButtonElement

export default class ValidForm extends Controller<HTMLFormElement> {
  private submitElement: SubmitElement | null = null
  private validatingElements: HTMLInputElement[] = []

  connect(): void {
    this.setup()
    if (!this.isValidSetup()) {
      return
    }

    this.validateForm()
    this.element.addEventListener("input", this.listenFormChanges.bind(this))
  }

  listenFormChanges(event: Event): void {
    const target = event.target as HTMLInputElement
    if (!this.validatingElements.includes(target)) {
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
    this.validatingElements = Array.from(this.element.querySelectorAll('input[type="text"]'))
  }

  isValidSetup(): boolean {
    if (!this.validatingElements.length) {
      console.warn("You're using Stimulus Components Valid form but your form does not contains any required fields")
      return false
    }

    if (!this.submitElement) {
      console.warn("You're using Stimulus Components Valid Form but your form does not contain any submit element")
      return false
    }

    return true
  }
}
