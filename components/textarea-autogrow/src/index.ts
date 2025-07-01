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

  initialize(): void {
    this.autogrow = this.autogrow.bind(this)
  }

  connect(): void {
    this.element.style.overflow = 'hidden'
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

    // while textarea scrollHeight > textarea offsetHeight & textarea offsetHeight < this.maxHeightValue (15) rows * height of 1 row
    while (
      textarea.scrollHeight > textarea.offsetHeight &&
      textarea.offsetHeight <
        this.maxHeightValue * parseFloat(getComputedStyle(textarea).lineHeight)
    ) {
      // increase height of textarea by one row
      textarea.style.height = `${
        textarea.offsetHeight +
        parseFloat(getComputedStyle(textarea).lineHeight)
      }px`
    }
    // if textarea already has > maxHeight rows, activate scroll
    if (
      textarea.offsetHeight >=
      this.maxHeightValue * parseFloat(getComputedStyle(textarea).lineHeight)
    ) {
      textarea.style.overflowY = 'auto'
    }
  }
}