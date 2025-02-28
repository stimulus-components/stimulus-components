/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import Confirmation from "../src/index"
import { nextFrame } from "../../../utils"

const startStimulus = (): void => {
  const application = Application.start()
  application.register("confirmation", Confirmation)
}

describe("#check", () => {
  describe("with one input", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
        <form data-controller="confirmation">
          <input
            id="confirmation"
            data-confirmation-target="input"
            data-confirmation-content="DELETE"
            data-action="confirmation#check"
          />

          <button data-confirmation-target="item" disabled>Delete</button>
          <input data-confirmation-target="item" disabled />
        </form>
      `
    })

    it("should enable all items", (): void => {
      const input = document.querySelector<HTMLInputElement>("#confirmation")
      const itemsDisabled = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:disabled")

      expect(itemsDisabled.length).toBe(2)

      input.value = "DELETE"
      input.dispatchEvent(new Event("input", { bubbles: true }))

      const itemsEnabled = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:enabled")
      expect(itemsEnabled.length).toBe(2)
    })

    it("should not enable all items", (): void => {
      const input = document.querySelector<HTMLInputElement>("#confirmation")
      const itemsDisabled = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:disabled")

      expect(itemsDisabled.length).toBe(2)

      input.value = "FOOBAR"
      input.dispatchEvent(new Event("input", { bubbles: true }))

      const itemsEnabled = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:enabled")
      expect(itemsEnabled.length).toBe(0)
    })
  })

  describe("with multiple inputs", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
        <form data-controller="confirmation">
          <input
            id="confirmation"
            data-confirmation-target="input"
            data-confirmation-content="DELETE"
            data-action="confirmation#check"
          />

          <input type="checkbox" id="checkbox" data-confirmation-target="input">

          <button data-confirmation-target="item" disabled>Delete</button>
          <input data-confirmation-target="item" disabled />
        </form>
      `
    })

    it("should enable all items", (): void => {
      const input = document.querySelector<HTMLInputElement>("#confirmation")
      const checkbox = document.querySelector<HTMLInputElement>("#checkbox")
      const itemsDisabled = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:disabled")

      expect(itemsDisabled.length).toBe(2)

      checkbox.click()

      input.value = "DELETE"
      input.dispatchEvent(new Event("input", { bubbles: true }))

      const itemsEnabled = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:enabled")
      expect(itemsEnabled.length).toBe(2)
    })

    it("should not enable all items", (): void => {
      const input = document.querySelector<HTMLInputElement>("#confirmation")
      const itemsDisabled = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:disabled")

      expect(itemsDisabled.length).toBe(2)

      input.value = "DELETE"
      input.dispatchEvent(new Event("input", { bubbles: true }))

      const itemsEnabled = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:enabled")
      expect(itemsEnabled.length).toBe(0)
    })
  })

  describe("dynamic input handling", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
        <form data-controller="confirmation">
          <input
            id="confirmation"
            data-confirmation-target="input"
            data-confirmation-content="DELETE"
            data-action="confirmation#check"
          />

          <button data-confirmation-target="item" disabled>Delete</button>
        </form>
      `
    })
    it("should re-run check when a new input is added", async () => {
      const form = document.querySelector<HTMLFormElement>("[data-controller='confirmation']")
      const input = document.querySelector<HTMLInputElement>("#confirmation")
      const itemsDisabled = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:disabled")

      expect(itemsDisabled.length).toBe(1)

      input.remove()

      const newInput = document.createElement("input")
      newInput.setAttribute("id", "confirmation")
      newInput.setAttribute("data-confirmation-target", "input")
      newInput.setAttribute("data-confirmation-content", "DELETE")
      newInput.setAttribute("data-action", "confirmation#check")
      newInput.value = "DELETE"

      form.appendChild(newInput)
      await nextFrame()

      const itemsEnabled = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:enabled")
      expect(itemsEnabled.length).toBe(1)
    })

    it("should re-run check when an input is removed", () => {
      const input = document.querySelector<HTMLInputElement>("#confirmation")
      input.remove()

      const itemsEnabledAfter = document.querySelectorAll<HTMLInputElement>("[data-confirmation-target='item']:enabled")
      expect(itemsEnabledAfter.length).toBe(0)
    })
  })
})
