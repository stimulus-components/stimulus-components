/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import Pluralize from "../src/index"

const startStimulus = (): void => {
  const application = Application.start()
  application.register("pluralize", Pluralize)
}

describe("#update", () => {
  describe("for an input", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
      <div data-controller="pluralize">
        <input
          data-pluralize-target="input"
          type="number"
          placeholder="0"
        >

        There
        <span data-pluralize-target="text" data-singular="is" data-plural="are"></span>
        <strong data-pluralize-target="value"></strong>
        <span data-pluralize-target="text" data-singular="puppy" data-plural="puppies"></span>
        from this input.
      </div>
    `
    })

    it("should correctly pluralize for 0", (): void => {
      const input = document.querySelector<HTMLInputElement>('[data-pluralize-target="input"]')
      const texts = document.querySelectorAll<HTMLElement>('[data-pluralize-target="text"]')
      const value = document.querySelector<HTMLElement>('[data-pluralize-target="value"]')

      input.value = "0"
      input.dispatchEvent(new Event("input"))

      expect(value.innerHTML).toBe("0")
      expect(texts[0].innerHTML).toBe("are")
      expect(texts[1].innerHTML).toBe("puppies")
    })

    it("should correctly pluralize for 1", (): void => {
      const input = document.querySelector<HTMLInputElement>('[data-pluralize-target="input"]')
      const texts = document.querySelectorAll<HTMLElement>('[data-pluralize-target="text"]')
      const value = document.querySelector<HTMLElement>('[data-pluralize-target="value"]')

      input.value = "1"
      input.dispatchEvent(new Event("input"))

      expect(value.innerHTML).toBe("1")
      expect(texts[0].innerHTML).toBe("is")
      expect(texts[1].innerHTML).toBe("puppy")
    })

    it("should correctly pluralize for 2", (): void => {
      const input = document.querySelector<HTMLInputElement>('[data-pluralize-target="input"]')
      const texts = document.querySelectorAll<HTMLElement>('[data-pluralize-target="text"]')
      const value = document.querySelector<HTMLElement>('[data-pluralize-target="value"]')

      input.value = "2"
      input.dispatchEvent(new Event("input"))

      expect(value.innerHTML).toBe("2")
      expect(texts[0].innerHTML).toBe("are")
      expect(texts[1].innerHTML).toBe("puppies")
    })
  })
})
