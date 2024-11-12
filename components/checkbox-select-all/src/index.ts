import { Controller } from "@hotwired/stimulus"

export default class CheckboxSelectAll extends Controller {
  declare readonly hasCheckboxAllTarget: boolean
  declare readonly checkboxTargets: HTMLInputElement[]
  declare readonly checkboxAllTarget: HTMLInputElement
  declare readonly disableIndeterminateValue: boolean

  static targets: string[] = ["checkboxAll", "checkbox"]

  static values = { disableIndeterminate: { type: Boolean, default: false } }

  initialize() {
    this.toggle = this.toggle.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  checkboxAllTargetConnected(checkbox: HTMLInputElement): void {
    checkbox.addEventListener("change", this.toggle)

    this.refresh()
  }

  checkboxTargetConnected(checkbox: HTMLInputElement): void {
    checkbox.addEventListener("change", this.refresh)

    this.refresh()
  }

  checkboxAllTargetDisconnected(checkbox: HTMLInputElement): void {
    checkbox.removeEventListener("change", this.toggle)

    this.refresh()
  }

  checkboxTargetDisconnected(checkbox: HTMLInputElement): void {
    checkbox.removeEventListener("change", this.refresh)

    this.refresh()
  }

  toggle(e: Event): void {
    e.preventDefault()

    this.checkboxTargets.forEach((checkbox) => {
      // @ts-expect-error
      checkbox.checked = e.target.checked
      this.triggerInputEvent(checkbox)
    })
  }

  refresh(): void {
    const checkboxesCount = this.checkboxTargets.length
    const checkboxesCheckedCount = this.checked.length

    if (this.disableIndeterminateValue) {
      this.checkboxAllTarget.checked = checkboxesCheckedCount === checkboxesCount
    } else {
      this.checkboxAllTarget.checked = checkboxesCheckedCount > 0
      this.checkboxAllTarget.indeterminate = checkboxesCheckedCount > 0 && checkboxesCheckedCount < checkboxesCount
    }
  }

  triggerInputEvent(checkbox: HTMLInputElement): void {
    const event = new Event("input", { bubbles: false, cancelable: true })

    checkbox.dispatchEvent(event)
  }

  get checked(): HTMLInputElement[] {
    return this.checkboxTargets.filter((checkbox) => checkbox.checked)
  }

  get unchecked(): HTMLInputElement[] {
    return this.checkboxTargets.filter((checkbox) => !checkbox.checked)
  }
}
