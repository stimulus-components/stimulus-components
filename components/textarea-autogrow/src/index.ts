import { Controller } from "@hotwired/stimulus"
import { debounce } from "../../../utils"

export default class extends Controller<HTMLInputElement> {
  declare onResize: EventListenerOrEventListenerObject // eslint-disable-line no-undef
  declare resizeDebounceDelayValue: number
  declare maxHeightValue: number

  static values = {
    resizeDebounceDelay: {
      type: Number,
      default: 100,
    },
    maxHeight: {
      type: Number,
      default: 0,
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
    const [heightVal, overflowVal] =
      this.maxHeightValue > 0 && this.element.scrollHeight >= this.maxHeightValue
        ? [this.maxHeightValue, "scroll"] // Stop autogrow and enable scrolling
        : [this.element.scrollHeight, "hidden"]
    this.element.style.height = `${heightVal}px`
    this.element.style.overflow = overflowVal
  }
}
