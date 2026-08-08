/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import TextareaAutogrow from "../src/index"

let application: Application

const LINE_HEIGHT = 20

// jsdom lays nothing out, so scrollHeight is always 0. This stands in for the
// browser growing the box as lines are added.
const stubScrollHeight = (): void => {
  Object.defineProperty(HTMLTextAreaElement.prototype, "scrollHeight", {
    configurable: true,
    get(this: HTMLTextAreaElement): number {
      return this.value.split("\n").length * LINE_HEIGHT
    },
  })
}

const startStimulus = (): void => {
  application = Application.start()
  application.register("textarea-autogrow", TextareaAutogrow)
}

const textarea = (): HTMLTextAreaElement => document.querySelector("#textarea")

const type = (element: HTMLTextAreaElement, value: string): void => {
  element.value = value

  element.dispatchEvent(new Event("input"))
}

const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

beforeEach((): void => {
  stubScrollHeight()
  startStimulus()

  document.body.innerHTML = `<textarea id="textarea" data-controller="textarea-autogrow">one</textarea>`
})

afterEach((): void => {
  document.body.innerHTML = ""

  application.stop()
})

describe("growing", () => {
  it("hides the overflow and sizes the textarea on connect", (): void => {
    expect(textarea().style.overflow).toBe("hidden")
    expect(textarea().style.height).toBe(`${LINE_HEIGHT}px`)
  })

  it("grows as lines are added", (): void => {
    type(textarea(), "one\ntwo\nthree")

    expect(textarea().style.height).toBe(`${LINE_HEIGHT * 3}px`)
  })

  it("shrinks again as lines are removed", (): void => {
    type(textarea(), "one\ntwo\nthree")
    type(textarea(), "one")

    expect(textarea().style.height).toBe(`${LINE_HEIGHT}px`)
  })

  it("grows on resize", async (): Promise<void> => {
    textarea().value = "one\ntwo"

    window.dispatchEvent(new Event("resize"))

    // The resize handler is debounced by 100ms by default.
    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(textarea().style.height).toBe(`${LINE_HEIGHT * 2}px`)
  })
})

describe("teardown", () => {
  it("stops listening for input once disconnected", async (): Promise<void> => {
    const element: HTMLTextAreaElement = textarea()

    element.remove()
    await flush()

    const height = element.style.height

    type(element, "one\ntwo\nthree")

    expect(element.style.height).toBe(height)
  })

  it("stops listening for resize once disconnected", async (): Promise<void> => {
    const element: HTMLTextAreaElement = textarea()

    element.remove()
    await flush()

    const height = element.style.height
    element.value = "one\ntwo\nthree"

    window.dispatchEvent(new Event("resize"))
    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(element.style.height).toBe(height)
  })

  it("does not stack input listeners across reconnects", async (): Promise<void> => {
    const element: HTMLTextAreaElement = textarea()
    const autogrow = vi.spyOn(element, "removeEventListener")

    element.remove()
    await flush()

    expect(autogrow).toHaveBeenCalledWith("input", expect.any(Function))

    document.body.appendChild(element)
    await flush()

    // Still exactly one live listener: the value grows once, not twice.
    type(element, "one\ntwo")

    expect(element.style.height).toBe(`${LINE_HEIGHT * 2}px`)

    autogrow.mockRestore()
  })
})
