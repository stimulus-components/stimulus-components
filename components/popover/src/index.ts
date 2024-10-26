import { Controller } from "@hotwired/stimulus"

export default class Popover extends Controller {
  declare readonly hasCardTarget: boolean
  declare readonly hasContentTarget: boolean
  declare readonly hasUrlValue: boolean
  declare readonly contentTarget: HTMLElement
  declare readonly cardTarget: HTMLElement
  declare readonly urlValue: string
  declare remoteContent: string

  static targets = ["card", "content"]
  static values = {
    url: String,
  }

  async show(event: Event): Promise<void> {
    // Temporally variable to prevent `event.currentTarget` to being null.
    const element = event.currentTarget

    let content: string = null

    if (this.hasContentTarget) {
      content = this.contentTarget.innerHTML
    } else {
      content = await this.fetch()
    }

    if (!content) return

    const fragment: DocumentFragment = document.createRange().createContextualFragment(content)
    // @ts-ignore
    element.appendChild(fragment)
  }

  hide(): void {
    if (this.hasCardTarget) {
      this.cardTarget.remove()
    }
  }

  async fetch(): Promise<string> {
    if (!this.remoteContent) {
      if (!this.hasUrlValue) {
        console.error("[stimulus-popover] You need to pass an url to fetch the popover content.")
        return
      }

      const response: Response = await fetch(this.urlValue)
      this.remoteContent = await response.text()
    }

    return this.remoteContent
  }
}
