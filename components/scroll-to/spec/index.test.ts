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

// jsdom implements history.pushState; spy on it to observe calls without
// mutating the URL mid-test.
const stubPushState = (): void => {
  vi.spyOn(window.history, "pushState").mockImplementation((): void => {})
}

// Stimulus connects controllers from a MutationObserver callback, so markup
// assigned inside a test body is not live until the microtask queue drains.
const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

afterEach(async (): Promise<void> => {
  // Application.stop() does not disconnect connected controllers, so clear the
  // DOM and drain the observer before stopping to release window listeners.
  document.body.innerHTML = ""
  await flush()
  application.stop()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

beforeEach((): void => {
  stubScrollTo()
  stubPushState()
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

  it("does not push the hash into the URL by default", (): void => {
    link().click()

    expect(window.history.pushState).not.toHaveBeenCalled()
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

describe("history value", () => {
  describe("when enabled", () => {
    beforeEach((): void => {
      document.body.innerHTML = `
        <a id="link" href="#target" data-controller="scroll-to" data-scroll-to-history-value="true">Scroll</a>
        <h2 id="target">Target</h2>
      `
    })

    it("stores the target hash in the URL", (): void => {
      link().click()

      expect(window.history.pushState).toHaveBeenCalledWith(null, "", "#target")
    })
  })

  describe("when disabled explicitly", () => {
    beforeEach((): void => {
      document.body.innerHTML = `
        <a id="link" href="#target" data-controller="scroll-to" data-scroll-to-history-value="false">Scroll</a>
        <h2 id="target">Target</h2>
      `
    })

    it("does not touch the URL", (): void => {
      link().click()

      expect(window.history.pushState).not.toHaveBeenCalled()
    })
  })

  describe("when enabled but the target is missing", () => {
    beforeEach((): void => {
      document.body.innerHTML = `
        <a id="link" href="#nope" data-controller="scroll-to" data-scroll-to-history-value="true">Scroll</a>
      `
    })

    it("warns, does not scroll, and does not push the hash", (): void => {
      const warn = vi.spyOn(console, "warn").mockImplementation((): void => {})

      link().click()

      expect(scrollTo).not.toHaveBeenCalled()
      expect(window.history.pushState).not.toHaveBeenCalled()
      expect(warn).toHaveBeenCalledOnce()
      expect(warn.mock.calls[0][0]).toContain('"nope"')
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

describe("back/forward navigation", () => {
  afterEach((): void => {
    history.replaceState(null, "", location.href.replace(/#.*/, ""))
  })

  describe("when history is enabled", () => {
    beforeEach((): void => {
      document.body.innerHTML = `
        <a id="link" href="#target" data-controller="scroll-to" data-scroll-to-history-value="true">Scroll</a>
        <h2 id="target">Target</h2>
      `
    })

    it("scrolls to the element matching the restored hash", (): void => {
      window.history.replaceState(null, "", "#target")

      window.dispatchEvent(new PopStateEvent("popstate"))

      expect(scrollTo).toHaveBeenCalledWith({ top: -10, behavior: "auto" })
    })

    it("warns and does not scroll when the hash matches no element", (): void => {
      const warn = vi.spyOn(console, "warn").mockImplementation((): void => {})
      window.history.replaceState(null, "", "#nope")

      window.dispatchEvent(new PopStateEvent("popstate"))

      expect(scrollTo).not.toHaveBeenCalled()
      expect(warn).toHaveBeenCalledOnce()
      expect(warn.mock.calls[0][0]).toContain('"nope"')
    })

    it("does nothing when the hash is empty", async (): Promise<void> => {
      const warn = vi.spyOn(console, "warn").mockImplementation((): void => {})
      await flush()

      window.dispatchEvent(new PopStateEvent("popstate"))

      expect(scrollTo).not.toHaveBeenCalled()
      expect(warn).not.toHaveBeenCalled()
    })
  })

  it("does not scroll when history is disabled", (): void => {
    window.history.replaceState(null, "", "#target")

    window.dispatchEvent(new PopStateEvent("popstate"))

    expect(scrollTo).not.toHaveBeenCalled()
  })
})
