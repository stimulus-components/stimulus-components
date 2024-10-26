import { Controller } from "@hotwired/stimulus"

export default class Clipboard extends Controller {
  declare readonly hasButtonTarget: boolean
  declare originalContent: string
  declare successDurationValue: number
  declare successContentValue: string
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
  }

  connect(): void {
    if (!this.hasButtonTarget) return

    this.originalContent = this.buttonTarget.innerHTML
  }

  copy(event: Event): void {
    event.preventDefault()

    const text = this.sourceTarget.innerHTML || this.sourceTarget.value

    navigator.clipboard.writeText(text).then(() => this.copied())
  }

  copied(): void {
    if (!this.hasButtonTarget) return

    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.buttonTarget.innerHTML = this.successContentValue

    // @ts-expect-error
    this.timeout = setTimeout(() => {
      this.buttonTarget.innerHTML = this.originalContent
    }, this.successDurationValue)
  }
}
