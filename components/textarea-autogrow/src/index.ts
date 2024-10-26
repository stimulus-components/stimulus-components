import { Controller } from "@hotwired/stimulus"
import { debounce } from "../../../utils"

export default class extends Controller<HTMLInputElement> {
  declare onResize: EventListenerOrEventListenerObject // eslint-disable-line no-undef
  declare resizeDebounceDelayValue: number

  static values = {
    resizeDebounceDelay: {
      type: Number,
      default: 100,
    },
  }

  initialize(): void {
    this.autogrow = this.autogrow.bind(this)
  }

  connect(): void {
    this.element.style.overflow = "hidden"
    const delay: number = this.resizeDebounceDelayValue

    this.onResize = delay > 0 ? debounce(this.autogrow, delay) : this.autogrow

    this.autogrow()

    this.element.addEventListener("input", this.autogrow)
    window.addEventListener("resize", this.onResize)
  }

  disconnect(): void {
    window.removeEventListener("resize", this.onResize)
  }

  autogrow(): void {
    this.element.style.height = "auto" // Force re-print before calculating the scrollHeight value.
    this.element.style.height = `${this.element.scrollHeight}px`
  }
}
