/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import Dropdown from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("dropdown", Dropdown)
}

// stimulus-use's leave() resolves off requestAnimationFrame, which takes ~200ms
// here on an idle machine and considerably longer when the whole suite runs in
// parallel. These waits are generous on purpose so the specs are not load-flaky.
const TRANSITION = { timeout: 8000, interval: 20 }
const TEST_TIMEOUT = 15000

afterEach((): void => {
  application.stop()
})

beforeEach((): void => {
  startStimulus()

  document.body.innerHTML = `
    <div id="dropdown" data-controller="dropdown">
      <button
        id="toggle"
        type="button"
        data-dropdown-target="button"
        data-action="dropdown#toggle click@window->dropdown#hide"
        aria-expanded="false"
        aria-controls="menu"
      >Options</button>
      <div id="menu" data-dropdown-target="menu" class="hidden">
        <a id="item" href="#" data-action="dropdown#toggle">Account settings</a>
      </div>
    </div>
    <button id="outside" type="button">Elsewhere</button>
  `
})

const menu = (): HTMLElement => document.querySelector("#menu")
const isOpen = (): boolean => !menu().classList.contains("hidden")
const expanded = (): string => document.querySelector("#toggle").getAttribute("aria-expanded")

describe("#toggle", () => {
  it("starts closed", (): void => {
    expect(isOpen()).toBe(false)
  })

  it("opens the menu", (): void => {
    document.querySelector<HTMLButtonElement>("#toggle").click()

    expect(isOpen()).toBe(true)
  })

  it(
    "closes an open menu",
    async (): Promise<void> => {
      const button = document.querySelector<HTMLButtonElement>("#toggle")

      button.click()

      expect(isOpen()).toBe(true)

      button.click()

      await vi.waitFor((): void => {
        expect(isOpen()).toBe(false)
      }, TRANSITION)
    },
    TEST_TIMEOUT,
  )
})

describe("#hide", () => {
  it(
    "closes the menu on a click outside the controller element",
    async (): Promise<void> => {
      document.querySelector<HTMLButtonElement>("#toggle").click()

      expect(isOpen()).toBe(true)

      document.querySelector<HTMLButtonElement>("#outside").click()

      await vi.waitFor((): void => {
        expect(isOpen()).toBe(false)
      }, TRANSITION)
    },
    TEST_TIMEOUT,
  )

  it("leaves the menu open when the click is inside the controller element", (): void => {
    document.querySelector<HTMLButtonElement>("#toggle").click()

    expect(isOpen()).toBe(true)

    // A click on the menu itself must not dismiss it — only `dropdown#toggle`
    // on a specific item should.
    menu().click()

    expect(isOpen()).toBe(true)
  })

  it("does nothing when the menu is already closed", (): void => {
    expect(isOpen()).toBe(false)

    document.querySelector<HTMLButtonElement>("#outside").click()

    expect(isOpen()).toBe(false)
  })
})

describe("aria-expanded", () => {
  it("starts collapsed", (): void => {
    expect(expanded()).toEqual("false")
  })

  it("follows the menu when the button is clicked", (): void => {
    const button = document.querySelector<HTMLButtonElement>("#toggle")

    button.click()

    expect(expanded()).toEqual("true")

    // The leave animation resolves asynchronously, the attribute must not wait for it.
    button.click()

    expect(expanded()).toEqual("false")
  })

  it("collapses when an item inside the menu is clicked", (): void => {
    document.querySelector<HTMLButtonElement>("#toggle").click()

    expect(expanded()).toEqual("true")

    document.querySelector<HTMLAnchorElement>("#item").click()

    expect(expanded()).toEqual("false")
  })

  it("collapses on a click outside the controller element", (): void => {
    document.querySelector<HTMLButtonElement>("#toggle").click()

    expect(expanded()).toEqual("true")

    document.querySelector<HTMLButtonElement>("#outside").click()

    expect(expanded()).toEqual("false")
  })

  describe("with a stale attribute in the markup", () => {
    beforeEach((): void => {
      application.stop()

      document.body.innerHTML = `
        <div data-controller="dropdown">
          <button id="toggle" type="button" data-dropdown-target="button" aria-expanded="true">Options</button>
          <div id="menu" data-dropdown-target="menu" class="hidden"></div>
        </div>
      `

      startStimulus()
    })

    it("corrects it on connect", (): void => {
      expect(expanded()).toEqual("false")
    })
  })

  describe("without a button target", () => {
    beforeEach((): void => {
      application.stop()

      document.body.innerHTML = `
        <div data-controller="dropdown">
          <button id="toggle" type="button" data-action="dropdown#toggle click@window->dropdown#hide">Options</button>
          <div id="menu" data-dropdown-target="menu" class="hidden"></div>
        </div>
        <button id="outside" type="button">Elsewhere</button>
      `

      startStimulus()
    })

    it("leaves the button alone and still opens the menu", (): void => {
      const button = document.querySelector<HTMLButtonElement>("#toggle")

      button.click()

      expect(isOpen()).toBe(true)
      expect(button.hasAttribute("aria-expanded")).toBe(false)
    })
  })
})
