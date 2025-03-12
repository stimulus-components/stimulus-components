import { Controller } from "@hotwired/stimulus"
import Sortable from "sortablejs"
import { patch, Options } from "@rails/request.js"

export default class StimulusSortable extends Controller<HTMLElement> {
  declare animationValue: number
  declare resourceNameValue: string
  declare paramNameValue: string
  declare responseKindValue: Options["responseKind"]
  declare sortable: Sortable
  declare handleValue: string
  declare indexOffsetValue: number

  static values = {
    resourceName: String,
    paramName: {
      type: String,
      default: "position",
    },
    responseKind: {
      type: String,
      default: "html",
    },
    animation: Number,
    handle: String,
    indexOffset: {
      type: Number,
      default: 1,
    },
  }

  initialize() {
    this.onUpdate = this.onUpdate.bind(this)
  }

  connect() {
    this.sortable = new Sortable(this.element, {
      ...this.defaultOptions,
      ...this.options,
    })
  }

  disconnect() {
    this.sortable.destroy()
    this.sortable = undefined
  }

  async onUpdate({ item, newIndex }) {
    if (!item.dataset.sortableUpdateUrl) return

    const param = this.resourceNameValue ? `${this.resourceNameValue}[${this.paramNameValue}]` : this.paramNameValue

    const data = new FormData()
    data.append(param, newIndex + this.indexOffsetValue)

    return await patch(item.dataset.sortableUpdateUrl, { body: data, responseKind: this.responseKindValue })
  }

  get options(): Sortable.Options {
    return {
      animation: this.animationValue || this.defaultOptions.animation || 150,
      handle: this.handleValue || this.defaultOptions.handle || undefined,
      onUpdate: this.onUpdate,
    }
  }

  get defaultOptions(): Sortable.Options {
    return {}
  }
}
