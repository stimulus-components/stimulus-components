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

  // Throttling happens here rather than in connect(): Stimulus reuses the
  // controller instance when the same element re-enters the DOM, so connect()
  // would throttle the already-throttled scroll and stack a new layer — and a
  // new timer per scroll event — on every reconnect.
  initialize(): void {
    const scroll = this.scroll.bind(this)

    this.scroll = this.throttleDelayValue > 0 ? throttle(scroll, this.throttleDelayValue) : scroll
  }

  connect(): void {
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
