/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import Clipboard from "../src/index"

let application: Application
let writeText: ReturnType<typeof vi.fn>

const startStimulus = (): void => {
  application = Application.start()
  application.register("clipboard", Clipboard)
}

// jsdom ships no Clipboard API, so the controller's only side effect has to be
// stubbed to be observable.
const stubClipboard = (): void => {
  writeText = vi.fn().mockResolvedValue(undefined)
  vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } })
}

afterEach((): void => {
  application.stop()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

beforeEach((): void => {
  stubClipboard()
  startStimulus()

  document.body.innerHTML = `
    <div data-controller="clipboard" data-clipboard-success-content-value="Copied!">
      <input id="source" type="text" value="Text to copy" data-clipboard-target="source" />
      <button id="button" type="button" data-action="clipboard#copy" data-clipboard-target="button">Copy</button>
    </div>
  `
})

const button = (): HTMLButtonElement => document.querySelector("#button")

describe("#copy", () => {
  it("writes the source value to the clipboard", (): void => {
    button().click()

    expect(writeText).toHaveBeenCalledWith("Text to copy")
  })

  it("preventDefaults the click", (): void => {
    const event = new MouseEvent("click", { bubbles: true, cancelable: true })
    button().dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  it("swaps in the success content once the write resolves", async (): Promise<void> => {
    button().click()

    // The swap happens in the promise callback, not synchronously.
    expect(button().innerHTML).toBe("Copy")

    await vi.waitFor((): void => {
      expect(button().innerHTML).toBe("Copied!")
    })
  })

  it("restores the original content after the success duration", async (): Promise<void> => {
    // Fake timers must be installed before the click: they only control
    // timers scheduled after installation.
    vi.useFakeTimers()

    button().click()

    // Flushes the clipboard write promise, so copied() runs and schedules the revert.
    await vi.advanceTimersByTimeAsync(0)

    expect(button().innerHTML).toBe("Copied!")

    await vi.advanceTimersByTimeAsync(1999)

    expect(button().innerHTML).toBe("Copied!")

    await vi.advanceTimersByTimeAsync(1)

    expect(button().innerHTML).toBe("Copy")
  })
})

describe("when removed while showing the success content", () => {
  it("does not fire the pending timeout", async (): Promise<void> => {
    vi.useFakeTimers()

    button().click()

    await vi.advanceTimersByTimeAsync(0)

    expect(button().innerHTML).toBe("Copied!")
    expect(vi.getTimerCount()).toBe(1)

    // A Turbo navigation drops the button before the revert is due.
    const detached: HTMLButtonElement = button()
    document.body.innerHTML = ""
    await vi.advanceTimersByTimeAsync(0)

    expect(vi.getTimerCount()).toBe(0)

    await vi.advanceTimersByTimeAsync(5000)

    expect(detached.innerHTML).toBe("Copied!")
  })
})

describe("with a custom success duration", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div
        data-controller="clipboard"
        data-clipboard-success-content-value="Copied!"
        data-clipboard-success-duration-value="5000"
      >
        <input id="source" type="text" value="Text to copy" data-clipboard-target="source" />
        <button id="button" type="button" data-action="clipboard#copy" data-clipboard-target="button">Copy</button>
      </div>
    `
  })

  it("waits for the configured delay before restoring", async (): Promise<void> => {
    vi.useFakeTimers()

    button().click()

    await vi.advanceTimersByTimeAsync(0)

    expect(button().innerHTML).toBe("Copied!")

    // Past the 2000ms default, still showing success.
    await vi.advanceTimersByTimeAsync(2000)

    expect(button().innerHTML).toBe("Copied!")

    await vi.advanceTimersByTimeAsync(3000)

    expect(button().innerHTML).toBe("Copy")
  })
})

describe("without a button target", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div data-controller="clipboard" data-clipboard-success-content-value="Copied!">
        <input id="source" type="text" value="Text to copy" data-clipboard-target="source" />
        <button id="button" type="button" data-action="clipboard#copy">Copy</button>
      </div>
    `
  })

  it("still copies without raising", async (): Promise<void> => {
    const errors: string[] = []
    application.handleError = (error: Error): void => {
      errors.push(error.message)
    }

    button().click()

    await vi.waitFor((): void => {
      expect(writeText).toHaveBeenCalledWith("Text to copy")
    })

    expect(errors).toEqual([])
    expect(button().innerHTML).toBe("Copy")
  })
})
