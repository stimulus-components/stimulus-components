/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import AnimatedNumber from "../src/index"

let application: Application

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

// Frames are driven by hand so the assertions do not depend on wall-clock time.
let frames: FrameRequestCallback[]

const stubAnimationFrame = (): void => {
  frames = []

  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback): number => frames.push(callback))
}

const runFrame = (timestamp: number): void => {
  const pending = frames
  frames = []

  pending.forEach((callback) => callback(timestamp))
}

const intersect = (target: Element): void => {
  callbacks[0]([{ isIntersecting: true, target } as IntersectionObserverEntry], {} as IntersectionObserver)
}

const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

const startStimulus = (): void => {
  application = Application.start()
  application.register("animated-number", AnimatedNumber)
}

const element = (): HTMLElement => document.querySelector("#el")

beforeEach((): void => {
  stubIntersectionObserver()
  stubAnimationFrame()

  startStimulus()
})

afterEach((): void => {
  document.body.innerHTML = ""

  application.stop()
  vi.unstubAllGlobals()
})

describe("eager animation", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <span
        id="el"
        data-controller="animated-number"
        data-animated-number-start-value="0"
        data-animated-number-end-value="100"
        data-animated-number-duration-value="1000"
      ></span>
    `
  })

  it("animates straight away without observing", (): void => {
    expect(records.length).toBe(0)

    runFrame(100)

    expect(element().innerHTML).toBe("0")
  })

  it("lands on the end value", (): void => {
    runFrame(100)
    runFrame(1100)

    expect(element().innerHTML).toBe("100")
    expect(frames.length).toBe(0)
  })
})

describe("lazy animation", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <span
        id="el"
        data-controller="animated-number"
        data-animated-number-start-value="0"
        data-animated-number-end-value="100"
        data-animated-number-duration-value="1000"
        data-animated-number-lazy-value="true"
      ></span>
    `
  })

  it("observes instead of animating straight away", (): void => {
    expect(records.length).toBe(1)
    expect(records[0].observed).toBe(1)
    expect(frames.length).toBe(0)
  })

  it("animates once the element intersects", (): void => {
    intersect(element())

    runFrame(100)
    runFrame(1100)

    expect(element().innerHTML).toBe("100")
  })

  it("stops observing after it has animated", (): void => {
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
