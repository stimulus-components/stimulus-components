/**
 * @jest-environment jsdom
 */


import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import AutoSubmit from "../src/"

let formElement: HTMLFormElement
let application: Application

const setupController = (delayValue = 150) => {
  application = Application.start()
  application.register("auto-submit", AutoSubmit)

  document.body.innerHTML = `
    <form data-controller="auto-submit" data-auto-submit-delay-value="${delayValue}">
      <input type="checkbox"  id="completed" data-action="change->auto-submit#submit" />
    </form>
  `
  formElement = document.querySelector("form")!
}

beforeEach(() => {
  // requestSubmit id not implemented in jsdom
  HTMLFormElement.prototype.requestSubmit = vi.fn()
})

afterEach(() => { application.stop() })


describe("#submit", () => {
  describe("with default delay value", () => {
    beforeEach(() => { setupController() })

    it("should call requestSubmit when submit is called", async () => {
      const requestSubmitSpy = vi.spyOn(formElement, "requestSubmit")

      const completedCheckbox: HTMLInputElement = document.querySelector("#completed")!
      completedCheckbox.dispatchEvent(new Event("change"))

      // Wait for the default debounce to complete
      await new Promise((resolve) => setTimeout(resolve, 150))

      expect(requestSubmitSpy).toHaveBeenCalledOnce()
    })
  })
  describe("with delay value set", () => {
    beforeEach(() => { setupController(200) })

    it("should debounce submit when delayValue is set", async () => {
      const requestSubmitSpy = vi.spyOn(formElement, "requestSubmit")

      const completedCheckbox: HTMLInputElement = document.querySelector("#completed")!

      completedCheckbox.dispatchEvent(new Event("change"))
      completedCheckbox.dispatchEvent(new Event("change"))

      // Wait for the debounce to complete
      await new Promise((resolve) => setTimeout(resolve, 200))

      expect(requestSubmitSpy).toHaveBeenCalledOnce()
    })
  })
})
