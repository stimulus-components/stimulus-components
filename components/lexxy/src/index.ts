import { Controller } from "@hotwired/stimulus"

export default class Lexxy extends Controller<HTMLElement> {
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
      this.dispatch("invalid-type", {
        detail: {
          file,
          allowedTypes: this.typesValue,
          message: `File type not allowed. We only accept ${this.typesValue.join(", ")}.`
        }
      })
      return
    }

    if (file.size > this.maxBytesValue) {
      event.preventDefault()
      const maxMB = Number((this.maxBytesValue / 1048576).toFixed(1))
      this.dispatch("invalid-size", {
        detail: {
          file,
          maxBytes: this.maxBytesValue,
          maxMB,
          message: `File too large. Maximum ${maxMB} MB allowed.`
        }
      })
    }
  }
}
