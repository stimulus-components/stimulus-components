/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import Prefetch from "../src/index"

let application: Application

// Every observer this spec creates, so teardown can be asserted on.
type Record = { observed: number; disconnected: boolean }
let records: Record[]
let callbacks: IntersectionObserverCallback[]

// jsdom implements no IntersectionObserver, so a recording fake stands in. It
// also hands back the callback, which is the only way to simulate the link
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

// jsdom reports every rel token as unsupported, which would short-circuit
// connect() before it ever observes.
const stubRelListSupport = (): void => {
  vi.spyOn(DOMTokenList.prototype, "supports").mockReturnValue(true)
}

const intersect = (target: Element): void => {
  callbacks[0]([{ isIntersecting: true, target } as IntersectionObserverEntry], {} as IntersectionObserver)
}

const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

const startStimulus = (): void => {
  application = Application.start()
  application.register("prefetch", Prefetch)
}

const prefetched = (): HTMLLinkElement[] => Array.from(document.head.querySelectorAll("link[rel='prefetch']"))

const link = (): HTMLAnchorElement => document.querySelector("#link")

const render = (): void => {
  document.body.innerHTML = `<a id="link" href="/next" data-controller="prefetch">Next</a>`
}

beforeEach((): void => {
  stubIntersectionObserver()
  stubRelListSupport()

  startStimulus()
})

afterEach((): void => {
  document.body.innerHTML = ""
  document.head.innerHTML = ""

  application.stop()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe("observing", () => {
  beforeEach((): void => {
    render()
  })

  it("observes the link without prefetching yet", (): void => {
    expect(records.length).toBe(1)
    expect(records[0].observed).toBe(1)
    expect(prefetched().length).toBe(0)
  })

  it("appends the prefetch link once it intersects", (): void => {
    intersect(link())

    expect(prefetched().length).toBe(1)
    expect(prefetched()[0].href.endsWith("/next")).toBe(true)
    expect(prefetched()[0].as).toBe("document")
  })

  it("stops observing after it has prefetched", (): void => {
    intersect(link())

    expect(records[0].disconnected).toBe(true)
  })
})

describe("teardown", () => {
  beforeEach((): void => {
    render()
  })

  it("disconnects the observer when the controller disconnects", async (): Promise<void> => {
    expect(records[0].disconnected).toBe(false)

    // A Turbo navigation removes the link before it ever scrolled into view.
    document.body.innerHTML = ""
    await flush()

    expect(records[0].disconnected).toBe(true)
    expect(prefetched().length).toBe(0)
  })

  it("does not accumulate observers across reconnects", async (): Promise<void> => {
    const markup = document.body.innerHTML

    document.body.innerHTML = ""
    await flush()

    document.body.innerHTML = markup
    await flush()

    expect(records.length).toBe(2)

    // Only the live one is still observing; the first no longer holds the
    // detached link or the dead controller.
    expect(records[0].disconnected).toBe(true)
    expect(records[1].disconnected).toBe(false)
  })
})

describe("when prefetch is unsupported", () => {
  beforeEach((): void => {
    vi.spyOn(DOMTokenList.prototype, "supports").mockReturnValue(false)

    render()
  })

  it("never observes", (): void => {
    expect(records.length).toBe(0)
    expect(prefetched().length).toBe(0)
  })
})
