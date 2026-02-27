import { Controller } from "@hotwired/stimulus"

export default class Clipboard extends Controller {
  declare readonly hasButtonTarget: boolean
  declare originalContent: string
  declare successDurationValue: number
  declare successContentValue: string
  declare successClassValue: string
  declare timeout: number
  declare readonly buttonTarget: HTMLElement
  declare readonly sourceTarget: HTMLInputElement

  static targets = ["button", "source"]
  static values = {
    successContent: String,
    successDuration: {
      type: Number,
      default: 2000,
    },
    successClass: {
      type: String,
      default: "--copied",
    },
  }

  connect(): void {
    if (!this.hasButtonTarget) return

    this.originalContent = this.buttonTarget.innerHTML
  }

  copy(event: Event): void {
    event.preventDefault()

    const text = this.sourceTarget.innerHTML || this.sourceTarget.value

    navigator.clipboard.writeText(text).then(() => this.copied())
    this.element.classList.add(this.successClassValue)
  }

  copied(): void {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    if (this.hasButtonTarget) {
      this.buttonTarget.innerHTML = this.successContentValue
    }

    this.timeout = window.setTimeout(() => {
      if (this.hasButtonTarget) {
        this.buttonTarget.innerHTML = this.originalContent
      }

      this.element.classList.remove(this.successClassValue)
    }, this.successDurationValue)
  }
}
