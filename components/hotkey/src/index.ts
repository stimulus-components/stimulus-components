import { Controller } from "@hotwired/stimulus"

export default class Hotkey extends Controller<HTMLElement> {
  click(event: KeyboardEvent): void {
    if (this.isClickable && !this.shouldIgnore(event)) {
      event.preventDefault()
      this.element.click()
    }
  }

  focus(event: KeyboardEvent): void {
    if (this.isClickable && !this.shouldIgnore(event)) {
      event.preventDefault()
      this.element.focus()
    }
  }

  private shouldIgnore(event: KeyboardEvent): boolean {
    const target = event.target as Element | null
    return event.defaultPrevented || !!target?.closest("input, textarea, lexxy-editor")
  }

  private get isClickable(): boolean {
    return getComputedStyle(this.element).pointerEvents !== "none"
  }
}
