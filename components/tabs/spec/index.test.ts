/**
 * @vitest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { Application } from "@hotwired/stimulus"
import Tabs from "../src/index"

let application: Application

const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

const render = async (values = ""): Promise<void> => {
  document.body.innerHTML = `
    <div data-controller="tabs" ${values}>
      <div data-tabs-target="tablist">
        <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Account</button>
        <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Password</button>
        <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate" disabled>Disabled</button>
        <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Billing</button>
      </div>
      <section data-tabs-target="panel">Account panel</section>
      <section data-tabs-target="panel">Password panel</section>
      <section data-tabs-target="panel">Disabled panel</section>
      <section data-tabs-target="panel">Billing panel</section>
    </div>
  `
  await flush()
}

const tabs = (): HTMLElement[] => Array.from(document.querySelectorAll("[data-tabs-target='tab']"))
const panels = (): HTMLElement[] => Array.from(document.querySelectorAll("[data-tabs-target='panel']"))
const press = (tab: HTMLElement, key: string): KeyboardEvent => {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true })
  tab.dispatchEvent(event)
  return event
}

beforeEach(() => {
  application = Application.start()
  application.register("tabs", Tabs)
})

afterEach(() => {
  application.stop()
  document.body.innerHTML = ""
  window.history.replaceState(null, "", "/")
})

describe("initialization", () => {
  it("adds the tab semantics and selects the first enabled tab", async () => {
    await render()

    expect(document.querySelector("[data-tabs-target='tablist']")?.getAttribute("role")).toBe("tablist")
    expect(document.querySelector("[data-tabs-target='tablist']")?.getAttribute("aria-orientation")).toBe("horizontal")
    expect(tabs().map((tab) => tab.getAttribute("aria-selected"))).toEqual(["true", "false", "false", "false"])
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1])
    expect(panels().map((panel) => panel.hidden)).toEqual([false, true, true, true])
    const generatedIds = [...tabs(), ...panels()].map((element) => element.id)
    expect(generatedIds.every(Boolean)).toBe(true)
    expect(new Set(generatedIds).size).toBe(generatedIds.length)
    expect(tabs()[0].getAttribute("aria-controls")).toBe(panels()[0].id)
    expect(panels()[0].getAttribute("aria-labelledby")).toBe(tabs()[0].id)
    expect(panels().every((panel) => panel.getAttribute("role") === "tabpanel")).toBe(true)
  })

  it("preserves the tab selected in the markup", async () => {
    document.body.innerHTML = `
      <div data-controller="tabs">
        <div data-tabs-target="tablist">
          <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Account</button>
          <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate" aria-selected="true">Password</button>
        </div>
        <section data-tabs-target="panel">Account panel</section>
        <section data-tabs-target="panel">Password panel</section>
      </div>
    `
    await flush()

    expect(tabs()[1].getAttribute("aria-selected")).toBe("true")
    expect(panels()[1].hidden).toBe(false)
  })

  it("hides every panel when all tabs are disabled", async () => {
    document.body.innerHTML = `
      <div data-controller="tabs">
        <div data-tabs-target="tablist">
          <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate" disabled>Unavailable</button>
        </div>
        <section data-tabs-target="panel">Unavailable panel</section>
      </div>
    `
    await flush()

    expect(tabs()[0].getAttribute("aria-selected")).toBe("false")
    expect(tabs()[0].tabIndex).toBe(-1)
    expect(panels()[0].hidden).toBe(true)
  })

  it("honors explicit aria-controls links", async () => {
    document.body.innerHTML = `
      <div data-controller="tabs">
        <div data-tabs-target="tablist">
          <button id="second-tab" aria-controls="second" data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Second</button>
          <button id="first-tab" aria-controls="first" data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">First</button>
        </div>
        <section id="first" data-tabs-target="panel">First panel</section>
        <section id="second" data-tabs-target="panel">Second panel</section>
      </div>
    `
    await flush()

    expect(panels().map((panel) => panel.hidden)).toEqual([true, false])
    expect(document.querySelector("#second")?.getAttribute("aria-labelledby")).toBe("second-tab")
  })
})

describe("selection", () => {
  it("selects a clicked tab and its panel", async () => {
    await render()

    tabs()[1].click()

    expect(tabs().map((tab) => tab.getAttribute("aria-selected"))).toEqual(["false", "true", "false", "false"])
    expect(panels().map((panel) => panel.hidden)).toEqual([true, false, true, true])
  })

  it("does not select disabled tabs", async () => {
    await render()

    tabs()[2].click()

    expect(tabs()[0].getAttribute("aria-selected")).toBe("true")
    expect(panels()[0].hidden).toBe(false)
  })
})

describe("keyboard navigation", () => {
  it("wraps through enabled horizontal tabs", async () => {
    await render()

    press(tabs()[0], "ArrowLeft")
    expect(document.activeElement).toBe(tabs()[3])
    expect(tabs()[3].getAttribute("aria-selected")).toBe("true")

    press(tabs()[3], "ArrowRight")
    expect(document.activeElement).toBe(tabs()[0])

    press(tabs()[0], "End")
    expect(document.activeElement).toBe(tabs()[3])

    press(tabs()[3], "Home")
    expect(document.activeElement).toBe(tabs()[0])
  })

  it("uses up and down arrows for vertical tabs", async () => {
    await render('data-tabs-orientation-value="vertical"')

    expect(document.querySelector("[role='tablist']")?.getAttribute("aria-orientation")).toBe("vertical")
    expect(press(tabs()[0], "ArrowRight").defaultPrevented).toBe(false)

    press(tabs()[0], "ArrowDown")
    expect(document.activeElement).toBe(tabs()[1])

    press(tabs()[1], "ArrowDown")
    expect(document.activeElement).toBe(tabs()[3])

    press(tabs()[3], "ArrowDown")
    expect(document.activeElement).toBe(tabs()[0])

    press(tabs()[0], "ArrowUp")
    expect(document.activeElement).toBe(tabs()[3])
  })

  it("moves focus without selecting in manual mode", async () => {
    await render('data-tabs-activation-value="manual"')

    press(tabs()[0], "ArrowRight")
    expect(document.activeElement).toBe(tabs()[1])
    expect(tabs()[0].getAttribute("aria-selected")).toBe("true")

    press(tabs()[1], "Enter")
    expect(tabs()[1].getAttribute("aria-selected")).toBe("true")
    expect(panels()[1].hidden).toBe(false)

    press(tabs()[1], "ArrowRight")
    expect(document.activeElement).toBe(tabs()[3])
    expect(tabs()[1].getAttribute("aria-selected")).toBe("true")

    press(tabs()[3], " ")
    expect(tabs()[3].getAttribute("aria-selected")).toBe("true")
    expect(panels()[3].hidden).toBe(false)
  })
})

describe("dynamic targets", () => {
  it("selects an enabled remaining tab when the active targets are removed", async () => {
    await render()
    tabs()[1].click()

    tabs()[1].remove()
    panels()[1].remove()
    await flush()

    const selectedTabs = tabs().filter((tab) => tab.getAttribute("aria-selected") === "true")
    const selectedTab = selectedTabs.at(0)
    const selectedPanel = panels().find((panel) => panel.id === selectedTab?.getAttribute("aria-controls"))

    expect(selectedTabs).toHaveLength(1)
    expect(selectedTab).toBeDefined()
    expect(selectedTab?.hasAttribute("disabled")).toBe(false)
    expect(selectedTab?.tabIndex).toBe(0)
    expect(selectedPanel).toBeDefined()
    expect(panels().filter((panel) => !panel.hidden)).toEqual([selectedPanel])
  })

  it("initializes and selects targets added after connection", async () => {
    await render()
    const tablist = document.querySelector("[data-tabs-target='tablist']") as HTMLElement
    const root = document.querySelector("[data-controller='tabs']") as HTMLElement
    const tab = document.createElement("button")
    const panel = document.createElement("section")

    tab.textContent = "Security"
    tab.dataset.tabsTarget = "tab"
    tab.dataset.action = "click->tabs#select keydown->tabs#navigate"
    panel.textContent = "Security panel"
    panel.dataset.tabsTarget = "panel"
    tablist.append(tab)
    root.append(panel)
    await flush()

    tab.click()

    expect(tab.getAttribute("role")).toBe("tab")
    expect(tab.getAttribute("aria-selected")).toBe("true")
    expect(panel.getAttribute("role")).toBe("tabpanel")
    expect(panel.hidden).toBe(false)
  })
})

describe("nested controllers", () => {
  it("keeps nested tab groups isolated", async () => {
    document.body.innerHTML = `
      <div id="outer" data-controller="tabs">
        <div data-tabs-target="tablist">
          <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Outer one</button>
          <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Outer two</button>
        </div>
        <section data-tabs-target="panel">
          <div id="inner" data-controller="tabs">
            <div data-tabs-target="tablist">
              <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Inner one</button>
              <button data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Inner two</button>
            </div>
            <section data-tabs-target="panel">Inner panel one</section>
            <section data-tabs-target="panel">Inner panel two</section>
          </div>
        </section>
        <section data-tabs-target="panel">Outer panel two</section>
      </div>
    `
    await flush()

    const outerTabs = Array.from(
      document.querySelectorAll<HTMLElement>("#outer > [data-tabs-target='tablist'] > [data-tabs-target='tab']"),
    )
    const innerTabs = Array.from(document.querySelectorAll<HTMLElement>("#inner [data-tabs-target='tab']"))

    innerTabs[1].click()
    expect(innerTabs[1].getAttribute("aria-selected")).toBe("true")
    expect(outerTabs[0].getAttribute("aria-selected")).toBe("true")

    outerTabs[1].click()
    expect(outerTabs[1].getAttribute("aria-selected")).toBe("true")
    expect(innerTabs[1].getAttribute("aria-selected")).toBe("true")

    const ids = Array.from(document.querySelectorAll<HTMLElement>("[role='tab'], [role='tabpanel']")).map(
      ({ id }) => id,
    )
    expect(ids.every(Boolean)).toBe(true)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("routes URL hashes only to the tab group that owns the panel", async () => {
    window.history.replaceState(null, "", "/#inner-two")
    document.body.innerHTML = `
      <div id="url-outer" data-controller="tabs" data-tabs-url-value="true">
        <div data-tabs-target="tablist">
          <button aria-controls="outer-one" data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Outer one</button>
          <button aria-controls="outer-two" data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Outer two</button>
        </div>
        <section id="outer-one" data-tabs-target="panel">
          <div id="url-inner" data-controller="tabs" data-tabs-url-value="true">
            <div data-tabs-target="tablist">
              <button aria-controls="inner-one" data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Inner one</button>
              <button aria-controls="inner-two" data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Inner two</button>
            </div>
            <section id="inner-one" data-tabs-target="panel">Inner panel one</section>
            <section id="inner-two" data-tabs-target="panel">Inner panel two</section>
          </div>
        </section>
        <section id="outer-two" data-tabs-target="panel">Outer panel two</section>
      </div>
    `
    await flush()

    const outerTabs = Array.from(
      document.querySelectorAll<HTMLElement>("#url-outer > [data-tabs-target='tablist'] > [data-tabs-target='tab']"),
    )
    const innerTabs = Array.from(document.querySelectorAll<HTMLElement>("#url-inner [data-tabs-target='tab']"))

    expect(outerTabs[0].getAttribute("aria-selected")).toBe("true")
    expect(innerTabs[1].getAttribute("aria-selected")).toBe("true")

    window.history.replaceState(null, "", "/#outer-two")
    window.dispatchEvent(new HashChangeEvent("hashchange"))

    expect(outerTabs[1].getAttribute("aria-selected")).toBe("true")
    expect(innerTabs[1].getAttribute("aria-selected")).toBe("true")
  })
})

describe("URL synchronization", () => {
  it("selects from the initial hash and updates the hash after selection", async () => {
    window.history.replaceState(null, "", "/#url-password")
    document.body.innerHTML = `
      <div data-controller="tabs" data-tabs-url-value="true">
        <div data-tabs-target="tablist">
          <button aria-controls="url-account" data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Account</button>
          <button aria-controls="url-password" data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate">Password</button>
          <button aria-controls="url-disabled" data-tabs-target="tab" data-action="click->tabs#select keydown->tabs#navigate" disabled>Disabled</button>
        </div>
        <section id="url-account" data-tabs-target="panel">Account panel</section>
        <section id="url-password" data-tabs-target="panel">Password panel</section>
        <section id="url-disabled" data-tabs-target="panel">Disabled panel</section>
      </div>
    `
    await flush()

    expect(tabs()[1].getAttribute("aria-selected")).toBe("true")

    tabs()[0].click()
    expect(window.location.hash).toBe("#url-account")

    window.history.replaceState(null, "", "/#url-password")
    window.dispatchEvent(new HashChangeEvent("hashchange"))
    expect(tabs()[1].getAttribute("aria-selected")).toBe("true")

    window.history.replaceState(null, "", "/#url-disabled")
    window.dispatchEvent(new HashChangeEvent("hashchange"))
    expect(tabs()[1].getAttribute("aria-selected")).toBe("true")

    window.history.replaceState(null, "", "/#unknown-panel")
    window.dispatchEvent(new HashChangeEvent("hashchange"))
    expect(tabs()[1].getAttribute("aria-selected")).toBe("true")

    const root = document.querySelector("[data-controller='tabs']") as HTMLElement
    let disconnectedChanges = 0
    root.addEventListener("tabs:change", () => (disconnectedChanges += 1))
    root.remove()
    await flush()
    window.history.replaceState(null, "", "/#url-account")
    window.dispatchEvent(new HashChangeEvent("hashchange"))
    expect(disconnectedChanges).toBe(0)
  })
})

describe("change events", () => {
  it("allows changes to be canceled and reports successful changes", async () => {
    await render('data-tabs-url-value="true"')
    const root = document.querySelector("[data-controller='tabs']") as HTMLElement
    const cancel = (event: Event): void => event.preventDefault()
    let detail: { from: HTMLElement | null; to: HTMLElement } | undefined
    let changes = 0

    root.addEventListener("tabs:before-change", cancel)
    tabs()[1].click()
    expect(tabs()[0].getAttribute("aria-selected")).toBe("true")
    expect(window.location.hash).toBe("")

    root.removeEventListener("tabs:before-change", cancel)
    root.addEventListener("tabs:change", (event) => {
      detail = (event as CustomEvent).detail
      changes += 1
    })
    tabs()[1].click()

    expect(detail).toEqual({ from: tabs()[0], to: tabs()[1] })
    expect(window.location.hash).toBe(`#${panels()[1].id}`)
    expect(changes).toBe(1)
    tabs()[1].click()
    expect(changes).toBe(1)
  })
})
