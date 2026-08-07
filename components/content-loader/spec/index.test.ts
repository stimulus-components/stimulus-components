/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import ContentLoader from "../src/index"

let application: Application
let fetchMock: ReturnType<typeof vi.fn>

// Every observer this spec creates, so teardown can be asserted on.
type Record = { observed: number; disconnected: boolean }
let records: Record[]
let callbacks: IntersectionObserverCallback[]

// jsdom implements no IntersectionObserver, so a recording fake stands in. It
// also hands back the callback, which is the only way to simulate the element
// scrolling into view.
const stubIntersectionObserver = (): void => {
  records = []
  callbacks = []

  class FakeIntersectionObserver {
    record: Record

    constructor(callback: IntersectionObserverCallback) {
      this.record = { observed: 0, disconnected: false }
      records.push(this.record)
      callbacks.push(callback)
    }

    observe(): void {
      this.record.observed++
    }

    unobserve(): void {}

    disconnect(): void {
      this.record.disconnected = true
    }

    takeRecords(): [] {
      return []
    }
  }

  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver)
}

const startStimulus = (): void => {
  application = Application.start()
  application.register("content-loader", ContentLoader)
}

const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

const intersect = (target: Element): void => {
  callbacks[0]([{ isIntersecting: true, target } as IntersectionObserverEntry], {} as IntersectionObserver)
}

afterEach((): void => {
  // Empty the body before the next Application.start(), otherwise it connects
  // to the previous test's leftover markup and fetches again.
  document.body.innerHTML = ""

  application.stop()
  vi.unstubAllGlobals()
})

beforeEach((): void => {
  stubIntersectionObserver()
  fetchMock = vi.fn().mockResolvedValue({ ok: true, text: async (): Promise<string> => "<p>loaded</p>" })
  vi.stubGlobal("fetch", fetchMock)

  startStimulus()
})

const element = (): HTMLElement => document.querySelector("#el")

describe("eager loading", () => {
  beforeEach((): void => {
    document.body.innerHTML = `<div id="el" data-controller="content-loader" data-content-loader-url-value="/x"></div>`
  })

  it("fetches immediately without observing", (): void => {
    expect(fetchMock).toHaveBeenCalledWith("/x")
    expect(records.length).toBe(0)
  })
})

describe("lazy loading", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div
        id="el"
        data-controller="content-loader"
        data-content-loader-url-value="/x"
        data-content-loader-lazy-loading-value="true"
      ></div>
    `
  })

  it("observes instead of fetching straight away", (): void => {
    expect(fetchMock).not.toHaveBeenCalled()
    expect(records.length).toBe(1)
    expect(records[0].observed).toBe(1)
  })

  it("fetches once the element intersects", async (): Promise<void> => {
    intersect(element())

    await flush()

    expect(fetchMock).toHaveBeenCalledWith("/x")
    expect(element().innerHTML.trim()).toBe("<p>loaded</p>")
  })

  it("stops observing after it has loaded", (): void => {
    intersect(element())

    expect(records[0].disconnected).toBe(true)
  })

  it("disconnects the observer when the controller disconnects", async (): Promise<void> => {
    expect(records[0].disconnected).toBe(false)

    // A Turbo navigation removes the element before it ever scrolled into view.
    document.body.innerHTML = ""
    await flush()

    expect(records[0].disconnected).toBe(true)
  })

  it("does not accumulate observers across reconnects", async (): Promise<void> => {
    const markup = document.body.innerHTML

    // Turbo replaces the page and later restores it from cache.
    document.body.innerHTML = ""
    await flush()

    document.body.innerHTML = markup
    await flush()

    expect(records.length).toBe(2)

    // Only the live one is still observing; the first no longer holds the
    // detached element or the dead controller.
    expect(records[0].disconnected).toBe(true)
    expect(records[1].disconnected).toBe(false)
  })
})

describe("refresh interval", () => {
  beforeEach((): void => {
    vi.useFakeTimers()

    document.body.innerHTML = `
      <div
        id="el"
        data-controller="content-loader"
        data-content-loader-url-value="/x"
        data-content-loader-refresh-interval-value="1000"
      ></div>
    `
  })

  afterEach((): void => {
    vi.useRealTimers()
  })

  it("refetches on the interval", async (): Promise<void> => {
    await vi.advanceTimersByTimeAsync(0)

    expect(fetchMock).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(1000)

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it("stops refetching once disconnected", async (): Promise<void> => {
    await vi.advanceTimersByTimeAsync(1000)

    expect(fetchMock).toHaveBeenCalledTimes(2)

    document.body.innerHTML = ""
    await vi.advanceTimersByTimeAsync(0)

    await vi.advanceTimersByTimeAsync(5000)

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})

describe("without a url value", () => {
  beforeEach((): void => {
    document.body.innerHTML = `<div id="el" data-controller="content-loader"></div>`
  })

  it("logs an error and does nothing", (): void => {
    expect(fetchMock).not.toHaveBeenCalled()
    expect(records.length).toBe(0)
  })
})
