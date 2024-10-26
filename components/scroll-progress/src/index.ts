import { Controller } from "@hotwired/stimulus"
import { throttle } from "../../../utils"

export default class ScrollProgress extends Controller<HTMLElement> {
  declare readonly throttleDelayValue: number

  static values = {
    throttleDelay: {
      type: Number,
      default: 15,
    },
  }

  initialize(): void {
    this.scroll = this.scroll.bind(this)
  }

  connect(): void {
    if (this.throttleDelayValue > 0) {
      this.scroll = throttle(this.scroll, this.throttleDelayValue)
    }

    window.addEventListener("scroll", this.scroll, { passive: true })
    this.scroll()
  }

  disconnect(): void {
    window.removeEventListener("scroll", this.scroll)
  }

  scroll(): void {
    const height: number = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const width: number = (window.scrollY / height) * 100

    this.element.style.width = `${width}%`
  }
}
