import { Controller } from "@hotwired/stimulus"

export default class EnhancedLexxy extends Controller<HTMLElement> {
  declare maxBytesValue: number
  declare typesValue: Array<string>
  declare attachments: boolean
  declare _boundOnAttachmentsAccept: (event: Event) => void

  static values = {
    maxBytes: {
      type: Number,
      default: 5 * 1024 * 1024,
    },
    types: {
      type: Array,
      default: ["image/jpeg", "image/png", "application/pdf"],
    },
  }

  connect(): void {
    this.attachments = this.element.getAttribute("attachments") !== "false"
    if (this.attachments) {
      this._boundOnAttachmentsAccept = this._onAttachmentsAccept.bind(this)
      this.element.addEventListener("lexxy:file-accept", this._boundOnAttachmentsAccept)
    }
  }

  disconnect(): void {
    if (this.attachments && this._boundOnAttachmentsAccept) {
      this.element.removeEventListener("lexxy:file-accept", this._boundOnAttachmentsAccept)
    }
  }

  _onAttachmentsAccept(event: CustomEvent): void {
    const file = event.detail?.file
    if (!file) return

    if (this.typesValue.indexOf(file.type) === -1) {
      event.preventDefault()
      const customEvent = new CustomEvent("stimulus-enhanced-lexxy:invalid-type", {
        detail: {
          file,
          allowedTypes: this.typesValue,
          message: `File type not allowed. We only accept ${this.typesValue.join(", ")}.`,
        },
        bubbles: true,
      })
      this.element.dispatchEvent(customEvent)
      return
    }

    if (file.size > this.maxBytesValue) {
      event.preventDefault()
      const maxMB = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(this.maxBytesValue / 1048576)
      const customEvent = new CustomEvent("stimulus-enhanced-lexxy:invalid-size", {
        detail: {
          file,
          maxBytes: this.maxBytesValue,
          maxMB,
          message: `File too large. Maximum ${maxMB} MB allowed.`,
        },
        bubbles: true,
      })
      this.element.dispatchEvent(customEvent)
    }
  }
}
