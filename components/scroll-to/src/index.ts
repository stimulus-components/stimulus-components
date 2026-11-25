import { Controller } from "@hotwired/stimulus"

interface Option {
  offset?: number

  behavior?: ScrollBehavior
  history?: boolean
}

export default class ScrollTo extends Controller<HTMLAnchorElement> {
  declare offsetValue: number

  declare behaviorValue: ScrollBehavior
  declare hasOffsetValue: boolean

  declare historyValue: boolean
  declare hasHistoryValue: boolean

  static values = {
    offset: Number,
    behavior: String,
    history: Boolean,
  }

  initialize(): void {
    this.scroll = this.scroll.bind(this)
    this.onPopState = this.onPopState.bind(this)
  }

  connect(): void {
    this.element.addEventListener("click", this.scroll)
    if (this.history) {
      window.addEventListener("popstate", this.onPopState)
    }
  }

  disconnect(): void {
    this.element.removeEventListener("click", this.scroll)
    window.removeEventListener("popstate", this.onPopState)
  }

  historyValueChanged(): void {
    if (this.history) {
      window.addEventListener("popstate", this.onPopState)
    } else {
      window.removeEventListener("popstate", this.onPopState)
    }
  }

  scroll(event: Event): void {
    event.preventDefault()

    const id: string = this.element.hash.replace(/^#/, "")

    if (this.scrollToElement(id, this.behavior) && this.history) {
      const hash: string = `#${id}`
      if (location.hash !== hash) {
        history.pushState(null, "", hash)
      }
    }
  }

  onPopState(_event: PopStateEvent): void {
    if (!this.history || !location.hash) {
      return
    }

    const id: string = location.hash.replace(/^#/, "")
    this.scrollToElement(id, "auto")
  }

  scrollToElement(id: string, behavior: ScrollBehavior): boolean {
    const target = document.getElementById(id)

    if (!target) {
      console.warn(`[@stimulus-components/scroll-to] The element with the id: "${id}" does not exist on the page.`)
      return false
    }

    const elementPosition: number = target.getBoundingClientRect().top + window.scrollY
    const offsetPosition: number = elementPosition - this.offset

    window.scrollTo({
      top: offsetPosition,
      behavior,
    })

    return true
  }

  get offset(): number {
    if (this.hasOffsetValue) {
      return this.offsetValue
    }

    if (this.defaultOptions.offset !== undefined) {
      return this.defaultOptions.offset
    }

    return 10
  }

  get behavior(): ScrollBehavior {
    return this.behaviorValue || this.defaultOptions.behavior || "smooth"
  }

  get history(): boolean {
    if (this.hasHistoryValue) {
      return this.historyValue
    }

    return this.defaultOptions.history ?? false
  }

  get defaultOptions(): Option {
    return {}
  }
}
