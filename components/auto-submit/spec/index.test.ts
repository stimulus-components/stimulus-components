/**
 * @vitest-environment jsdom
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

  describe("when the same element reconnects", () => {
    beforeEach(() => {
      vi.useFakeTimers()

      startStimulus()

      document.body.innerHTML = `
        <form data-controller="auto-submit">
          <input type="checkbox" data-action="change->auto-submit#submit" />
        </form>
      `
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it("should keep the configured delay", async () => {
      // Stimulus reuses the controller instance when the very same element
      // leaves and re-enters the DOM, e.g. a Turbo cache restore, so anything
      // wrapping `submit` in connect() would wrap the already-wrapped one.
      const form: HTMLFormElement = document.querySelector("form")

      form.remove()
      await vi.advanceTimersByTimeAsync(0)

      document.body.appendChild(form)
      await vi.advanceTimersByTimeAsync(0)

      const requestSubmitSpy = vi.spyOn(form, "requestSubmit")
      const checkbox: HTMLInputElement = document.querySelector("input")

      checkbox.click()

      await vi.advanceTimersByTimeAsync(150)

      expect(requestSubmitSpy).toHaveBeenCalledOnce()
    })
  })
})
