import { Controller } from "@hotwired/stimulus"

export default class Prefetch extends Controller<HTMLAnchorElement> {
  declare observer?: IntersectionObserver

  initialize(): void {
    this.prefetch = this.prefetch.bind(this)
    this.load = this.load.bind(this)
  }

  connect(): void {
    if (!this.hasPrefetch) return

    this.load()
  }

  disconnect(): void {
    this.stopObserving()
  }

  load(): void {
    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          this.prefetch()

          this.stopObserving()
        }
      })
    })

    this.observer.observe(this.element)
  }

  stopObserving(): void {
    this.observer?.disconnect()
    this.observer = undefined
  }

  prefetch(): void {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection

    if (connection) {
      // Don't prefetch if using 2G or if Save-Data is enabled.
      if (connection.saveData) {
        console.warn("[@stimulus-components/prefetch] Cannot prefetch, Save-Data is enabled.")
        return
      }

      if (connection.effectiveType !== "4g") {
        console.warn("[@stimulus-components/prefetch] Cannot prefetch, network conditions are poor.")
        return
      }
    }

    const link: HTMLLinkElement = document.createElement("link")
    link.rel = "prefetch"
    link.href = this.element.href
    link.as = "document"

    document.head.appendChild(link)
  }

  get hasPrefetch(): boolean {
    const link: HTMLLinkElement = document.createElement("link")

    return link.relList && link.relList.supports && link.relList.supports("prefetch")
  }
}
