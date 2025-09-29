import { Controller } from "@hotwired/stimulus"

export default class Pluralize extends Controller {
  declare readonly inputTarget: HTMLInputElement
  declare readonly observeTarget: HTMLElement
  declare readonly textTargets: Array<HTMLElement>
  declare readonly valueTargets: Array<HTMLElement>
  declare readonly phraseTargets: Array<HTMLElement>

  declare readonly hasInputTarget: boolean
  declare readonly hasObserveTarget: boolean
  declare readonly hasCountdownValue: boolean

  static targets = ["input", "observe", "text", "value", "phrase"]
  static values = {
    singular: { type: String, default: "" },
    plural: { type: String, default: "" },
  }

  initialize(): void {
    console.log("yooooo")
    this.update = this.update.bind(this)
  }

  connect(): void {
    console.log("HELLO?")
  }

  inputTargetConnected(element): void {
    console.log("input target hello?", { element })
    this.update()
    element.addEventListener('input', this.update)
  }

  inputTargetDisconnected(element): void {
    console.log("input target GOODBYE", { element })
    element.removeEventListener('input', this.update)
  }

  update(): void {
    const number = this.number || 0
    this.updateTargetsWithNumber(number)
  }

  get number(): number {
    let value: string;

    if (this.hasInputTarget) {
      value = this.inputTarget.value
    }

    return Number(value)
  }

  usePlural(number): boolean {
    return number != 1
  }

  getText(target, number): string {
    const plural = this.usePlural(number)
    const text = plural ? target.dataset.plural: target.dataset.singular

    return text
  }

  updateTargetsWithNumber(number): void {
    this.valueTargets.forEach((valueTarget) => valueTarget.textContent = number);
    this.textTargets.forEach((textTarget) => {
      textTarget.textContent = this.getText(textTarget, number)
    });
  }
}
