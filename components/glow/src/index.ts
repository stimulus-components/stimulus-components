import { Controller } from "@hotwired/stimulus"

export default class extends Controller<HTMLElement> {
  declare childTarget: HTMLElement
  declare overlayTarget: HTMLElement

  static targets = ["child", "overlay"]

  initialize(): void {
    this.move = this.move.bind(this)
  }

  connect(): void {
    this.overlayTarget.append(this.childTarget.cloneNode(true))

    document.body.addEventListener("pointermove", this.move)
  }

  disconnect(): void {
    document.body.removeEventListener("pointermove", this.move)
  }

  move(e: PointerEvent): void {
    const x = e.pageX - this.element.offsetLeft
    const y = e.pageY - this.element.offsetTop

    this.element.style.setProperty("--glow-opacity", "1")
    this.element.style.setProperty("--glow-x", `${x}px`)
    this.element.style.setProperty("--glow-y", `${y}px`)
  }
}
