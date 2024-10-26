import { Controller } from "@hotwired/stimulus"

export default class Dialog extends Controller {
  declare readonly dialogTarget: HTMLDialogElement
  declare readonly openValue: boolean

  static targets = ["dialog"]
  static values = {
    open: {
      type: Boolean,
      default: false,
    },
  }

  initialize() {
    this.forceClose = this.forceClose.bind(this)
  }

  connect(): void {
    if (this.openValue) {
      this.open()
    }

    document.addEventListener("turbo:before-render", this.forceClose)
  }

  disconnect(): void {
    document.removeEventListener("turbo:before-render", this.forceClose)
  }

  open(): void {
    this.dialogTarget.showModal()
  }

  close(): void {
    this.dialogTarget.setAttribute("closing", "")

    Promise.all(this.dialogTarget.getAnimations().map((animation) => animation.finished)).then(() => {
      this.dialogTarget.removeAttribute("closing")
      this.dialogTarget.close()
    })
  }

  backdropClose(event: Event): void {
    if ((event.target as HTMLElement) === this.dialogTarget) {
      this.close()
    }
  }

  forceClose(): void {
    this.dialogTarget.close()
  }
}
