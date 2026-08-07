/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import Hotkey from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("hotkey", Hotkey)
}

afterEach((): void => {
  application.stop()
})

beforeEach((): void => {
  startStimulus()

  document.body.innerHTML = `
    <button id="button" type="button" data-controller="hotkey" data-action="keydown.j@document->hotkey#click">
      Submit
    </button>
    <input id="field" type="text" data-controller="hotkey" data-action="keydown.k@document->hotkey#focus" />
    <input id="unrelated" type="text" />
    <textarea id="notes"></textarea>
  `
})

// Dispatch from `document.body` rather than `document`: the controller reads
// `event.target.closest(...)`, and in a browser a keydown always targets the
// focused element (`<body>` by default), never the document itself.
const press = (key: string, target: EventTarget = document.body, options: KeyboardEventInit = {}): KeyboardEvent => {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...options })
  target.dispatchEvent(event)
  return event
}

describe("#click", () => {
  it("clicks the element when the key is pressed", (): void => {
    const clicked = vi.fn()
    document.querySelector("#button").addEventListener("click", clicked)

    press("j")

    expect(clicked).toHaveBeenCalledOnce()
  })

  it("preventDefaults the keyboard event", (): void => {
    const event = press("j")

    expect(event.defaultPrevented).toBe(true)
  })

  it("ignores other keys", (): void => {
    const clicked = vi.fn()
    document.querySelector("#button").addEventListener("click", clicked)

    press("x")

    expect(clicked).not.toHaveBeenCalled()
  })
})

describe("#focus", () => {
  it("focuses the element when the key is pressed", (): void => {
    press("k")

    expect(document.activeElement).toBe(document.querySelector("#field"))
  })
})

describe("when the event originates in a text field", () => {
  it("does nothing for an input", (): void => {
    const clicked = vi.fn()
    document.querySelector("#button").addEventListener("click", clicked)

    press("j", document.querySelector("#unrelated"))

    expect(clicked).not.toHaveBeenCalled()
  })

  it("does nothing for a textarea", (): void => {
    const clicked = vi.fn()
    document.querySelector("#button").addEventListener("click", clicked)

    press("j", document.querySelector("#notes"))

    expect(clicked).not.toHaveBeenCalled()
  })
})

describe("when the event is already handled", () => {
  it("does nothing if defaultPrevented", (): void => {
    const clicked = vi.fn()
    document.querySelector("#button").addEventListener("click", clicked)

    // A listener registered earlier in the capture phase consumed the event.
    document.addEventListener("keydown", (event: Event): void => event.preventDefault(), { capture: true, once: true })

    press("j")

    expect(clicked).not.toHaveBeenCalled()
  })
})

describe("when the element is not clickable", () => {
  it("does nothing if pointer-events is none", (): void => {
    const button: HTMLElement = document.querySelector("#button")
    button.style.pointerEvents = "none"

    const clicked = vi.fn()
    button.addEventListener("click", clicked)

    press("j")

    expect(clicked).not.toHaveBeenCalled()
  })
})
