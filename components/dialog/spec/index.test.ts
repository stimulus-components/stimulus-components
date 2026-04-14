/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import Dialog from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("dialog", Dialog)
}

const flushPromises = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 0))
}

const mockDialogElement = (): void => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value: vi.fn(),
  })

  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value: vi.fn(),
  })

  Object.defineProperty(HTMLDialogElement.prototype, "getAnimations", {
    configurable: true,
    value: vi.fn(() => []),
  })

  Object.defineProperty(HTMLDialogElement.prototype, "removeAttribute", {
    configurable: true,
    value: vi.fn(),
  })
}

const getDialog = (): HTMLDialogElement => document.querySelector<HTMLDialogElement>("dialog") as HTMLDialogElement

const getController = (): Dialog => {
  const element = document.querySelector("[data-controller='dialog']") as HTMLElement
  return application.getControllerForElementAndIdentifier(element, "dialog") as Dialog
}

beforeEach(() => {
  mockDialogElement()
  document.body.innerHTML = ""
  startStimulus()
})

afterEach(() => {
  application.stop()
  vi.restoreAllMocks()
})

describe("#connect", () => {
  it("should open the dialog when open value is true", async () => {
    document.body.innerHTML = `
      <div data-controller="dialog" data-dialog-open-value="true">
        <dialog data-dialog-target="dialog"></dialog>
      </div>
    `

    await flushPromises()

    expect(getDialog().showModal).toHaveBeenCalledOnce()
  })

  it("should not open the dialog when open value is false", async () => {
    document.body.innerHTML = `
      <div data-controller="dialog">
        <dialog data-dialog-target="dialog"></dialog>
      </div>
    `

    await flushPromises()

    expect(getDialog().showModal).not.toHaveBeenCalled()
  })
})

describe("#open", () => {
  it("should set open value and show the dialog", async () => {
    document.body.innerHTML = `
      <div data-controller="dialog">
        <dialog data-dialog-target="dialog"></dialog>
      </div>
    `

    await flushPromises()

    const controller = getController()

    controller.open()

    expect(controller.openValue).toBe(true)
    expect(getDialog().showModal).toHaveBeenCalledOnce()
  })
})

describe("#close", () => {
  it("should set closing attribute and close dialog after animations finish", async () => {
    document.body.innerHTML = `
      <div data-controller="dialog">
        <dialog data-dialog-target="dialog"></dialog>
      </div>
    `

    await flushPromises()

    const controller = getController()
    const dialog = getDialog()
    const finished = Promise.resolve()

    vi.mocked(dialog.getAnimations).mockReturnValue([{ finished } as Animation])

    controller.close()

    expect(controller.openValue).toBe(false)
    expect(dialog.setAttribute).toBeDefined()
    expect(dialog.getAttribute("closing")).toBe("")

    await flushPromises()

    expect(dialog.removeAttribute).toHaveBeenCalledWith("closing")
    expect(dialog.close).toHaveBeenCalledOnce()
  })
})

describe("#backdropClose", () => {
  it("should close the dialog when the event target is the dialog", async () => {
    document.body.innerHTML = `
      <div data-controller="dialog">
        <dialog data-dialog-target="dialog"></dialog>
      </div>
    `

    await flushPromises()

    const controller = getController()
    const closeSpy = vi.spyOn(controller, "close")

    controller.backdropClose({ target: getDialog() } as Event)

    expect(closeSpy).toHaveBeenCalledOnce()
  })

  it("should not close the dialog when the event target is not the dialog", async () => {
    document.body.innerHTML = `
      <div data-controller="dialog">
        <dialog data-dialog-target="dialog"></dialog>
      </div>
    `

    await flushPromises()

    getController().backdropClose(new Event("click", { bubbles: true }))

    expect(getDialog().close).not.toHaveBeenCalled()
  })
})

describe("#forceClose", () => {
  it("should close the dialog", async () => {
    document.body.innerHTML = `
      <div data-controller="dialog">
        <dialog data-dialog-target="dialog"></dialog>
      </div>
    `

    await flushPromises()

    getController().forceClose()

    expect(getDialog().close).toHaveBeenCalledOnce()
  })
})

describe("turbo:before-render", () => {
  it("should close the dialog when turbo:before-render is dispatched", async () => {
    document.body.innerHTML = `
      <div data-controller="dialog">
        <dialog data-dialog-target="dialog"></dialog>
      </div>
    `

    await flushPromises()

    const dialog = getDialog()
    const closeSpy = vi.spyOn(dialog, "close")

    document.dispatchEvent(new Event("turbo:before-render"))

    expect(closeSpy).toHaveBeenCalledOnce()
  })
})
