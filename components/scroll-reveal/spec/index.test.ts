/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import ScrollReveal from "../src/index"

let application: Application

// Every observer this spec creates, so teardown can be asserted on.
type Record = { observed: Element[]; unobserved: Element[]; disconnected: boolean }
let records: Record[]
let callbacks: IntersectionObserverCallback[]

// jsdom implements no IntersectionObserver, so a recording fake stands in. It
// also hands back the callback, which is the only way to simulate an item
// scrolling into view.
const stubIntersectionObserver = (): void => {
  records = []
  callbacks = []

  class FakeIntersectionObserver {
    record: Record

    constructor(callback: IntersectionObserverCallback) {
      this.record = { observed: [], unobserved: [], disconnected: false }
      records.push(this.record)
      callbacks.push(callback)
    }

    observe(target: Element): void {
      this.record.observed.push(target)
    }

    unobserve(target: Element): void {
      this.record.unobserved.push(target)
    }

    disconnect(): void {
      this.record.disconnected = true
    }

    takeRecords(): [] {
      return []
    }
  }

  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver)
}

const intersect = (target: Element, ratio = 0.5): void => {
  callbacks[0]([{ intersectionRatio: ratio, target } as IntersectionObserverEntry], {
    unobserve: (element: Element): void => {
      records[0].unobserved.push(element)
    },
  } as IntersectionObserver)
}

const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

const startStimulus = (): void => {
  application = Application.start()
  application.register("scroll-reveal", ScrollReveal)
}

const items = (): HTMLElement[] => Array.from(document.querySelectorAll("[data-scroll-reveal-target='item']"))

beforeEach((): void => {
  stubIntersectionObserver()
  startStimulus()

  document.body.innerHTML = `
    <div data-controller="scroll-reveal">
      <p id="first" data-scroll-reveal-target="item">First</p>
      <p id="second" data-scroll-reveal-target="item" data-delay="200ms">Second</p>
    </div>
  `
})

afterEach((): void => {
  document.body.innerHTML = ""

  application.stop()
  vi.unstubAllGlobals()
})

describe("revealing", () => {
  it("observes every item on connect", (): void => {
    expect(records.length).toBe(1)
    expect(records[0].observed).toEqual(items())
  })

  it("adds the class once an item passes the threshold", (): void => {
    intersect(items()[0])

    expect(items()[0].classList.contains("in")).toBe(true)
    expect(items()[1].classList.contains("in")).toBe(false)
  })

  it("leaves items below the threshold alone", (): void => {
    intersect(items()[0], 0.05)

    expect(items()[0].classList.contains("in")).toBe(false)
  })

  it("applies the per-item delay", (): void => {
    intersect(items()[1])

    expect(items()[1].style.transitionDelay).toBe("200ms")
  })

  it("unobserves an item once it has been revealed", (): void => {
    intersect(items()[0])

    expect(records[0].unobserved).toEqual([items()[0]])
  })
})

describe("teardown", () => {
  it("disconnects the observer when the controller disconnects", async (): Promise<void> => {
    expect(records[0].disconnected).toBe(false)

    document.body.innerHTML = ""
    await flush()

    expect(records[0].disconnected).toBe(true)
  })

  it("releases items that left the DOM before the controller did", async (): Promise<void> => {
    // Unobserving `itemTargets` one by one misses this item: it is already out
    // of the list by the time disconnect() runs.
    document.querySelector("#first").remove()
    await flush()

    document.body.innerHTML = ""
    await flush()

    expect(records[0].disconnected).toBe(true)
  })
})
