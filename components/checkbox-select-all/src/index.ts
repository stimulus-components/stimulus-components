import { Controller } from "@hotwired/stimulus"

export default class CheckboxSelectAll extends Controller {
  declare readonly hasCheckboxAllTarget: boolean
  declare readonly checkboxTargets: HTMLInputElement[]
  declare readonly checkboxAllTarget: HTMLInputElement
  declare readonly disableIndeterminateValue: boolean
  declare readonly ignoreDisabledValue: boolean

  static targets = ["checkboxAll", "checkbox"]

  static values = {
    disableIndeterminate: {
      type: Boolean,
      default: false,
    },
    ignoreDisabled: {
      type: Boolean,
      default: false,
    },
  }

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

    const { checked } = e.target as HTMLInputElement

    // A disabled checkbox cannot be changed by the user and is not submitted with
    // the form, so the checkboxAll target must never change it either.
    this.enabled.forEach((checkbox) => {
      checkbox.checked = checked
      this.triggerInputEvent(checkbox)
    })

    // The checkbox targets do not emit a change event here, so the state of the
    // checkboxAll target must be computed again. It can stay indeterminate when a
    // disabled checkbox keeps a different state.
    this.refresh()
  }

  refresh(): void {
    // A checkbox target can connect or disconnect while no checkboxAll target is
    // in the DOM, e.g. when it lives in a conditionally rendered header row.
    if (!this.hasCheckboxAllTarget) return

    // The indeterminate state counts the disabled checkboxes, unless the controller
    // is told to ignore them. The checked state always counts only the checkboxes
    // the checkboxAll target can change, so a click always toggles the enabled ones.
    const checkboxes = this.ignoreDisabledValue ? this.enabled : this.checkboxTargets
    const checkboxesCount = checkboxes.length
    const checkboxesCheckedCount = checkboxes.filter((checkbox) => checkbox.checked).length

    const enabledCount = this.enabled.length
    const enabledCheckedCount = this.enabled.filter((checkbox) => checkbox.checked).length

    if (this.disableIndeterminateValue) {
      this.checkboxAllTarget.checked = enabledCount > 0 && enabledCheckedCount === enabledCount
    } else {
      this.checkboxAllTarget.checked = enabledCheckedCount > 0
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

  get enabled(): HTMLInputElement[] {
    return this.checkboxTargets.filter((checkbox) => !checkbox.disabled)
  }

  get disabled(): HTMLInputElement[] {
    return this.checkboxTargets.filter((checkbox) => checkbox.disabled)
  }
}
