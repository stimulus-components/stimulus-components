import { Controller } from "@hotwired/stimulus"

export default class CheckboxSelectAll extends Controller {
  declare readonly hasCheckboxAllTarget: boolean
  declare readonly checkboxTargets: HTMLInputElement[]
  declare readonly checkboxAllTarget: HTMLInputElement
  declare readonly hasLabelTarget: boolean
  declare readonly labelTarget: HTMLElement
  declare readonly disableIndeterminateValue: boolean
  declare readonly hasCheckedTextValue: boolean
  declare readonly checkedTextValue: string
  declare readonly hasUncheckedTextValue: boolean
  declare readonly uncheckedTextValue: string

  static targets = ["checkboxAll", "checkbox", "label"]

  static values = {
    disableIndeterminate: {
      type: Boolean,
      default: false,
    },
    checkedText: String,
    uncheckedText: String,
  }

  initialize() {
    this.toggle = this.toggle.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  connect(): void {
    this.refresh()
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

    this.refresh()
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

    this.updateLabel()
  }

  private updateLabel(): void {
    if (!this.hasLabelTarget) return
    if (!this.hasCheckedTextValue) return
    if (!this.hasUncheckedTextValue) return

    this.labelTarget.textContent = this.checkboxAllTarget.checked ? this.checkedTextValue : this.uncheckedTextValue
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
