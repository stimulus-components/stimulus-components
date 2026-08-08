import { Controller } from "@hotwired/stimulus"
import { debounce } from "../../../utils"

export default class AutoSubmit extends Controller<HTMLFormElement> {
  declare delayValue: number

  static values = {
    delay: {
      type: Number,
      default: 150,
    },
  }

  // Wrapping happens here rather than in connect(): Stimulus reuses the
  // controller instance when the same element re-enters the DOM, so connect()
  // would debounce the already-debounced submit and compound the delay.
  initialize(): void {
    const submit = this.submit.bind(this)

    this.submit = this.delayValue > 0 ? debounce(submit, this.delayValue) : submit
  }

  submit(): void {
    this.element.requestSubmit()
  }
}
