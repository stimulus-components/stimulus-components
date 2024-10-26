import { Controller } from "@hotwired/stimulus"
import { useTransition } from "stimulus-use"

export default class Notification extends Controller {
  declare timeout: number
  declare enter: (event?: Event) => void
  declare leave: (event?: Event) => void
  declare transitioned: false
  declare delayValue: number
  declare hiddenValue: boolean

  static values = {
    delay: {
      type: Number,
      default: 3000,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  }

  initialize() {
    this.hide = this.hide.bind(this)
  }

  connect() {
    useTransition(this)

    if (this.hiddenValue === false) {
      this.show()
    }
  }

  show() {
    this.enter()

    // @ts-expect-error
    this.timeout = setTimeout(this.hide, this.delayValue)
  }

  async hide() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    await this.leave()

    this.element.remove()
  }
}
