import { Controller } from "@hotwired/stimulus"

export default class Pluralize extends Controller {
  declare readonly inputTarget: HTMLInputElement
  declare readonly observeTarget: HTMLInputElement
  declare readonly textTargets: Array<HTMLElement>
  declare readonly valueTargets: Array<HTMLElement>

  declare readonly hasInputTarget: boolean
  declare readonly hasObserveTarget: boolean

  declare observer: MutationObserver

  static targets = ["input", "observe", "text", "value"]

  initialize(): void {
    this.update = this.update.bind(this)
  }

  inputTargetConnected(element): void {
    this.update()
    element.addEventListener("input", this.update)
  }

  inputTargetDisconnected(element): void {
    element.removeEventListener("input", this.update)
  }

  observeTargetConnected(element): void {
    this.update()
    this.observer = this.updateObserver()
    this.observer.observe(element, {
      characterData: true,
      childList: true,
    })
  }

  observeTargetDisconnected(_element): void {
    this.observer.disconnect()
  }

  updateObserver(): MutationObserver {
    const observer = new MutationObserver(this.update)

    return observer
  }

  update(): void {
    const count = this.count || 0
    this.updateTargetsWithCount(count)
  }

  get count(): number {
    let value: string

    if (this.hasInputTarget) {
      value = this.inputTarget.value
    } else if (this.hasObserveTarget) {
      value = this.observeTarget.textContent
    }

    return Number(value)
  }

  usePlural(count): boolean {
    return count != 1
  }

  getText(target, count): string {
    const plural = this.usePlural(count)
    const text = plural ? this.getPluralText(target) : this.getSingularText(target)

    return text
  }

  getPluralText(target): string {
    return target.dataset.plural
  }

  getSingularText(target): string {
    return target.dataset.singular
  }

  updateTargetsWithCount(count): void {
    this.valueTargets.forEach((valueTarget) => valueTarget.textContent = count)
    this.textTargets.forEach((textTarget) => {
      textTarget.textContent = this.getText(textTarget, count)
    })
  }
}
