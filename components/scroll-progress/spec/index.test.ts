/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import ScrollProgress from "../src/index"

let application: Application

// jsdom lays nothing out, so the page has no scrollable height of its own.
const stubPageHeight = (): void => {
  Object.defineProperty(document.documentElement, "scrollHeight", { value: 2000, configurable: true })
  Object.defineProperty(document.documentElement, "clientHeight", { value: 1000, configurable: true })
  Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true })
}

const scrollTo = (y: number): void => {
  ;(window as Window & { scrollY: number }).scrollY = y

  window.dispatchEvent(new Event("scroll"))
}

const startStimulus = (): void => {
  application = Application.start()
  application.register("scroll-progress", ScrollProgress)
}

const bar = (): HTMLElement => document.querySelector("#bar")

beforeEach((): void => {
  vi.useFakeTimers()
  stubPageHeight()
  startStimulus()
})

afterEach((): void => {
  document.body.innerHTML = ""

  application.stop()
  vi.useRealTimers()
})

describe("with the default throttle delay", () => {
  beforeEach((): void => {
    document.body.innerHTML = `<div id="bar" data-controller="scroll-progress"></div>`
  })

  it("sets the width from the current scroll position on connect", (): void => {
    expect(bar().style.width).toBe("0%")
  })

  it("updates the width as the page scrolls", (): void => {
    // connect() calls scroll() itself, which consumes the throttle's leading
    // edge; let it reopen before scrolling.
    vi.advanceTimersByTime(15)

    scrollTo(500)

    expect(bar().style.width).toBe("50%")
  })

  it("throttles the updates", (): void => {
    vi.advanceTimersByTime(15)

    scrollTo(500)
    scrollTo(1000)

    expect(bar().style.width).toBe("50%")

    vi.advanceTimersByTime(15)
    scrollTo(1000)

    expect(bar().style.width).toBe("100%")
  })

  it("stops updating once disconnected", (): void => {
    document.body.innerHTML = ""

    scrollTo(1000)

    expect(bar()).toBeNull()
  })

  it("does not stack a throttle layer when the same element reconnects", async (): Promise<void> => {
    // Stimulus reuses the controller instance when the very same element leaves
    // and re-enters the DOM, e.g. a Turbo cache restore.
    const element: HTMLElement = bar()

    element.remove()
    await vi.advanceTimersByTimeAsync(0)

    document.body.appendChild(element)
    await vi.advanceTimersByTimeAsync(20)

    scrollTo(500)

    // One throttle layer means one pending timer. A second layer would schedule
    // its own on every scroll event, forever.
    expect(vi.getTimerCount()).toBe(1)
    expect(bar().style.width).toBe("50%")
  })
})

describe("with the throttle disabled", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div id="bar" data-controller="scroll-progress" data-scroll-progress-throttle-delay-value="0"></div>
    `
  })

  it("updates on every scroll event", (): void => {
    scrollTo(500)

    expect(bar().style.width).toBe("50%")

    scrollTo(1000)

    expect(bar().style.width).toBe("100%")
  })

  it("schedules no timer at all", (): void => {
    scrollTo(500)

    expect(vi.getTimerCount()).toBe(0)
  })
})
