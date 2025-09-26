/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import AutoSubmit from "../src/"
import { sleep } from "../../../utils"

let application: Application

const startStimulus = () => {
  application = Application.start()
  application.register("auto-submit", AutoSubmit)
}

beforeEach(() => {
  // requestSubmit id not implemented in jsdom
  HTMLFormElement.prototype.requestSubmit = vi.fn()
})

afterEach(() => {
  application.stop()
})

describe("#submit", () => {
  describe("with default delay value", () => {
    beforeEach(() => {
      startStimulus()

      document.body.innerHTML = `
        <form data-controller="auto-submit">
          <input type="checkbox" data-action="change->auto-submit#submit" />
        </form>
      `
    })

    it("should debounce the requestSubmit call", async () => {
      const requestSubmitSpy = vi.spyOn(document.querySelector("form"), "requestSubmit")
      const checkbox: HTMLInputElement = document.querySelector("input")

      checkbox.click()

      // Wait for the default debounce to complete
      await sleep(150)

      expect(requestSubmitSpy).toHaveBeenCalledOnce()
    })
  })

  describe("when delay value is set", () => {
    beforeEach(() => {
      startStimulus()

      document.body.innerHTML = `
        <form data-controller="auto-submit" data-auto-submit-delay-value="0">
          <input type="checkbox" data-action="change->auto-submit#submit" />
        </form>
      `
    })

    it("should not debounce the requestSubmit call", async () => {
      const requestSubmitSpy = vi.spyOn(document.querySelector("form"), "requestSubmit")
      const checkbox: HTMLInputElement = document.querySelector("input")

      checkbox.click()

      expect(requestSubmitSpy).toHaveBeenCalledOnce()
    })
  })

  describe("using a remote form", () => {
    beforeEach(() => {
      startStimulus()

      document.body.innerHTML = `
        <form id="my-form"></form>

        <div data-controller="auto-submit">
          <input type="checkbox" data-action="change->auto-submit#submit" form="my-form" />
        </div>
      `
    })

    it("should try to submit the form", async () => {
      const requestSubmitSpy = vi.spyOn(document.querySelector("form"), "requestSubmit")
      const checkbox: HTMLInputElement = document.querySelector("input")

      checkbox.click()

      // Wait for the default debounce to complete
      await sleep(150)

      expect(requestSubmitSpy).toHaveBeenCalledOnce()
    })
  })
})
