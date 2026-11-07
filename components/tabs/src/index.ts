import { Controller } from "@hotwired/stimulus"

let instance = 0

type ChangeDetail = {
  from: HTMLElement | null
  to: HTMLElement
}

export default class Tabs extends Controller {
  declare readonly tabTargets: HTMLElement[]
  declare readonly panelTargets: HTMLElement[]
  declare readonly hasTablistTarget: boolean
  declare readonly tablistTarget: HTMLElement
  declare readonly activationValue: string
  declare readonly orientationValue: string
  declare readonly urlValue: boolean

  static targets = ["tablist", "tab", "panel"]

  static values = {
    activation: { type: String, default: "auto" },
    orientation: { type: String, default: "horizontal" },
    url: { type: Boolean, default: false },
  }

  private connected = false
  private initialized = false
  private activeTab: HTMLElement | null = null
  private readonly instanceId = ++instance

  initialize(): void {
    this.syncFromHash = this.syncFromHash.bind(this)
  }

  connect(): void {
    this.connected = true
    if (this.urlValue) window.addEventListener("hashchange", this.syncFromHash)
    this.refresh()
    this.initialized = true
  }

  disconnect(): void {
    this.connected = false
    this.initialized = false
    window.removeEventListener("hashchange", this.syncFromHash)
  }

  urlValueChanged(): void {
    if (!this.connected) return

    window.removeEventListener("hashchange", this.syncFromHash)
    if (this.urlValue) {
      window.addEventListener("hashchange", this.syncFromHash)
      this.syncFromHash()
    }
  }

  tabTargetConnected(): void {
    if (this.connected) this.refresh()
  }

  tabTargetDisconnected(): void {
    if (this.connected) this.refresh()
  }

  panelTargetConnected(): void {
    if (this.connected) this.refresh()
  }

  panelTargetDisconnected(): void {
    if (this.connected) this.refresh()
  }

  select(event: Event): void {
    const tab = event.currentTarget

    if (tab instanceof HTMLElement) this.changeTo(tab)
  }

  navigate(event: KeyboardEvent): void {
    const tab = event.currentTarget

    if (!(tab instanceof HTMLElement) || this.disabled(tab) || event.altKey || event.ctrlKey || event.metaKey) return

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      this.changeTo(tab)
      return
    }

    const tabs = this.tabTargets.filter((candidate) => !this.disabled(candidate))
    const current = tabs.indexOf(tab)
    const vertical = this.orientationValue === "vertical"
    let next: number

    if (event.key === "Home") next = 0
    else if (event.key === "End") next = tabs.length - 1
    else if ((!vertical && event.key === "ArrowRight") || (vertical && event.key === "ArrowDown")) next = current + 1
    else if ((!vertical && event.key === "ArrowLeft") || (vertical && event.key === "ArrowUp")) next = current - 1
    else return

    event.preventDefault()

    const nextTab = tabs[(next + tabs.length) % tabs.length]
    nextTab?.focus()

    if (this.activationValue !== "manual" && nextTab) this.changeTo(nextTab)
  }

  private refresh(): void {
    if (this.hasTablistTarget) {
      this.tablistTarget.setAttribute("role", "tablist")
      this.tablistTarget.setAttribute(
        "aria-orientation",
        this.orientationValue === "vertical" ? "vertical" : "horizontal",
      )
    }

    this.panelTargets.forEach((panel) => panel.setAttribute("role", "tabpanel"))

    this.tabTargets.forEach((tab, index) => {
      const panel = this.panelFor(tab, index)

      tab.setAttribute("role", "tab")

      if (!panel) return

      tab.id ||= `tabs-${this.instanceId}-tab-${index + 1}`
      panel.id ||= `tabs-${this.instanceId}-panel-${index + 1}`
      tab.setAttribute("aria-controls", panel.id)
      panel.setAttribute("aria-labelledby", tab.id)
    })

    const activeStillExists =
      this.activeTab &&
      this.tabTargets.indexOf(this.activeTab) >= 0 &&
      !this.disabled(this.activeTab) &&
      this.panelFor(this.activeTab)
    const hashTab = !this.initialized && this.urlValue ? this.tabForHash() : undefined
    const selected = this.tabTargets.find(
      (tab, index) => tab.getAttribute("aria-selected") === "true" && !this.disabled(tab) && this.panelFor(tab, index),
    )
    const active =
      hashTab ??
      (activeStillExists ? this.activeTab : undefined) ??
      selected ??
      this.tabTargets.find((tab, index) => !this.disabled(tab) && this.panelFor(tab, index))

    if (active) {
      const repaired = this.initialized && active !== this.activeTab
      this.applyState(active)
      if (repaired && this.urlValue) this.updateHash(active)
    } else {
      this.activeTab = null
      this.panelTargets.forEach((panel) => (panel.hidden = true))
      this.tabTargets.forEach((tab) => {
        tab.setAttribute("aria-selected", "false")
        tab.tabIndex = -1
      })
    }
  }

  private changeTo(tab: HTMLElement, updateUrl = true): void {
    if (this.tabTargets.indexOf(tab) < 0 || this.disabled(tab) || !this.panelFor(tab) || tab === this.activeTab) return

    const detail: ChangeDetail = { from: this.activeTab, to: tab }
    const before = new CustomEvent<ChangeDetail>("tabs:before-change", {
      bubbles: true,
      cancelable: true,
      detail,
    })

    if (!this.element.dispatchEvent(before)) return

    this.applyState(tab)
    if (updateUrl && this.urlValue) this.updateHash(tab)
    this.element.dispatchEvent(new CustomEvent<ChangeDetail>("tabs:change", { bubbles: true, detail }))
  }

  private applyState(active: HTMLElement): void {
    const activePanel = this.panelFor(active)

    if (!activePanel) return

    this.activeTab = active
    this.panelTargets.forEach((panel) => (panel.hidden = panel !== activePanel))
    this.tabTargets.forEach((tab) => {
      const selected = tab === active
      tab.setAttribute("aria-selected", String(selected))
      tab.tabIndex = selected ? 0 : -1
    })
  }

  private syncFromHash(): void {
    const tab = this.tabForHash()
    if (tab) this.changeTo(tab, false)
  }

  private tabForHash(): HTMLElement | undefined {
    let id: string

    try {
      id = decodeURIComponent(window.location.hash.slice(1))
    } catch {
      return
    }

    if (!id) return

    const panel = this.panelTargets.find((candidate) => candidate.id === id)
    if (!panel) return

    return this.tabTargets.find((tab, index) => !this.disabled(tab) && this.panelFor(tab, index) === panel)
  }

  private updateHash(tab: HTMLElement): void {
    const panel = this.panelFor(tab)
    if (!panel?.id) return

    const url = `${window.location.pathname}${window.location.search}#${encodeURIComponent(panel.id)}`
    window.history.replaceState(window.history.state, "", url)
  }

  private panelFor(tab: HTMLElement, index = this.tabTargets.indexOf(tab)): HTMLElement | undefined {
    const controls = tab.getAttribute("aria-controls")

    return (controls && this.panelTargets.find((panel) => panel.id === controls)) || this.panelTargets[index]
  }

  private disabled(tab: HTMLElement): boolean {
    return tab.getAttribute("aria-disabled") === "true" || (tab instanceof HTMLButtonElement && tab.disabled)
  }
}
