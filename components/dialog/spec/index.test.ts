/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import Dialog from "../src/index"

let application: Application
let showModal: ReturnType<typeof vi.fn>
let close: ReturnType<typeof vi.fn>

const startStimulus = (): void => {
  application = Application.start()
  application.register("dialog", Dialog)
}

// jsdom implements neither the <dialog> modal methods nor the Web Animations
// API — the properties are absent entirely, so they are assigned rather than
// spied on. That keeps the assertions on the controller's own logic: which
// method it calls, and when.
const stubDialogElement = (): void => {
  showModal = vi.fn()
  close = vi.fn()

  HTMLDialogElement.prototype.showModal = showModal
  HTMLDialogElement.prototype.close = close
  HTMLDialogElement.prototype.getAnimations = vi.fn().mockReturnValue([])
}

afterEach(async (): Promise<void> => {
  // This controller registers a listener on `document`, which outlives the
  // element. Emptying the body and letting Stimulus process the mutation runs
  // disconnect(), so listeners do not leak into the next test.
  document.body.innerHTML = ""
  await new Promise((resolve) => setTimeout(resolve, 0))

  application.stop()

  delete HTMLDialogElement.prototype.showModal
  delete HTMLDialogElement.prototype.close
  delete HTMLDialogElement.prototype.getAnimations

  vi.restoreAllMocks()
})

beforeEach((): void => {
  stubDialogElement()
  startStimulus()

  document.body.innerHTML = `
    <div id="wrapper" data-controller="dialog">
      <button id="open" type="button" data-action="dialog#open">Open</button>
      <dialog id="dialog" data-dialog-target="dialog" data-action="click->dialog#backdropClose">
        <p id="content">Dialog content</p>
        <button id="close" type="button" data-action="dialog#close">Close</button>
      </dialog>
    </div>
  `
})

const dialog = (): HTMLDialogElement => document.querySelector("#dialog")

describe("#open", () => {
  it("opens the dialog as a modal", (): void => {
    document.querySelector<HTMLButtonElement>("#open").click()

    expect(showModal).toHaveBeenCalledOnce()
  })

  it("does not open on connect by default", (): void => {
    expect(showModal).not.toHaveBeenCalled()
  })
})

describe("when the open value is set", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div data-controller="dialog" data-dialog-open-value="true">
        <dialog id="dialog" data-dialog-target="dialog"><p>Dialog content</p></dialog>
      </div>
    `
  })

  it("opens on connect", (): void => {
    expect(showModal).toHaveBeenCalledOnce()
  })
})

describe("#close", () => {
  it("marks the dialog as closing then closes it", async (): Promise<void> => {
    document.querySelector<HTMLButtonElement>("#close").click()

    // The attribute is set synchronously so a CSS exit animation can hook it.
    expect(dialog().hasAttribute("closing")).toBe(true)

    await vi.waitFor((): void => {
      expect(close).toHaveBeenCalledOnce()
    })

    expect(dialog().hasAttribute("closing")).toBe(false)
  })
})

describe("#backdropClose", () => {
  it("closes when the click lands on the dialog itself", async (): Promise<void> => {
    dialog().click()

    await vi.waitFor((): void => {
      expect(close).toHaveBeenCalledOnce()
    })
  })

  it("ignores clicks on the dialog's contents", (): void => {
    document.querySelector<HTMLElement>("#content").click()

    expect(close).not.toHaveBeenCalled()
    expect(dialog().hasAttribute("closing")).toBe(false)
  })
})

describe("turbo:before-render", () => {
  it("force closes the dialog so it cannot survive a page render", (): void => {
    document.dispatchEvent(new CustomEvent("turbo:before-render"))

    expect(close).toHaveBeenCalledOnce()
  })

  it("stops listening once disconnected", async (): Promise<void> => {
    document.querySelector("#wrapper").removeAttribute("data-controller")

    await new Promise((resolve) => setTimeout(resolve, 0))

    document.dispatchEvent(new CustomEvent("turbo:before-render"))

    expect(close).not.toHaveBeenCalled()
  })
})
