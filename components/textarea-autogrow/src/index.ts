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
      default: 15,
    },
  }

  connect(): void {
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
    const textarea = this.element
    textarea.style.height = 'auto'
    textarea.style.overflowY = 'hidden'

    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight)
    const maxHeight = this.maxHeightValue * lineHeight

    while (textarea.scrollHeight > textarea.offsetHeight && textarea.offsetHeight < maxHeight) {
      textarea.style.height = `${textarea.offsetHeight + lineHeight}px`
    }

    if (textarea.offsetHeight >= maxHeight) {
      textarea.style.overflowY = 'auto'
    }
  }
}
