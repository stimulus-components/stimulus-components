/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import ScrollTo from "../src/index"

let application: Application
let scrollTo: ReturnType<typeof vi.fn>

const startStimulus = (): void => {
  application = Application.start()
  application.register("scroll-to", ScrollTo)
}

// jsdom does not implement window.scrollTo, so stub it to observe the call.
// getBoundingClientRect() and scrollY are both 0 here, which makes the
// expected top exactly the negated offset.
const stubScrollTo = (): void => {
  scrollTo = vi.fn()
  vi.stubGlobal("scrollTo", scrollTo)
}

// Stimulus connects controllers from a MutationObserver callback, so markup
// assigned inside a test body is not live until the microtask queue drains.
const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

afterEach((): void => {
  application.stop()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

beforeEach((): void => {
  stubScrollTo()
  startStimulus()

  document.body.innerHTML = `
    <a id="link" href="#target" data-controller="scroll-to">Scroll</a>
    <h2 id="target">Target</h2>
  `
})

const link = (): HTMLAnchorElement => document.querySelector("#link")

describe("#scroll", () => {
  it("scrolls to the element named by the hash", (): void => {
    link().click()

    expect(scrollTo).toHaveBeenCalledWith({ top: -10, behavior: "smooth" })
  })

  it("preventDefaults the click so the URL does not jump", (): void => {
    const event = new MouseEvent("click", { bubbles: true, cancelable: true })
    link().dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  it("adds the current scroll position to the element's viewport-relative top", (): void => {
    const target: HTMLElement = document.querySelector("#target")

    vi.spyOn(target, "getBoundingClientRect").mockReturnValue({ top: 100 } as DOMRect)
    vi.stubGlobal("scrollY", 300)

    link().click()

    // 100 below the fold, 300 already scrolled, less the default 10 offset.
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 390 }))
  })
})

describe("offset value", () => {
  it("defaults to 10", (): void => {
    link().click()

    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: -10 }))
  })

  describe("when set explicitly", () => {
    beforeEach((): void => {
      document.body.innerHTML = `
        <a id="link" href="#target" data-controller="scroll-to" data-scroll-to-offset-value="150">Scroll</a>
        <h2 id="target">Target</h2>
      `
    })

    it("uses the given offset", (): void => {
      link().click()

      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: -150 }))
    })
  })

  describe("when set to zero", () => {
    beforeEach((): void => {
      document.body.innerHTML = `
        <a id="link" href="#target" data-controller="scroll-to" data-scroll-to-offset-value="0">Scroll</a>
        <h2 id="target">Target</h2>
      `
    })

    it("uses zero rather than falling back to the default", (): void => {
      link().click()

      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }))
    })
  })
})

describe("behavior value", () => {
  it("defaults to smooth", (): void => {
    link().click()

    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: "smooth" }))
  })

  describe("when set explicitly", () => {
    beforeEach((): void => {
      document.body.innerHTML = `
        <a id="link" href="#target" data-controller="scroll-to" data-scroll-to-behavior-value="auto">Scroll</a>
        <h2 id="target">Target</h2>
      `
    })

    it("uses the given behavior", (): void => {
      link().click()

      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: "auto" }))
    })
  })
})

describe("when the hash matches no element", () => {
  beforeEach((): void => {
    document.body.innerHTML = `<a id="link" href="#nope" data-controller="scroll-to">Scroll</a>`
  })

  it("warns and does not scroll", (): void => {
    const warn = vi.spyOn(console, "warn").mockImplementation((): void => {})

    link().click()

    expect(scrollTo).not.toHaveBeenCalled()
    expect(warn).toHaveBeenCalledOnce()
    expect(warn.mock.calls[0][0]).toContain('"nope"')
  })
})

describe("#disconnect", () => {
  it("stops responding to clicks", async (): Promise<void> => {
    link().removeAttribute("data-controller")

    await flush()

    link().click()

    expect(scrollTo).not.toHaveBeenCalled()
  })
})
