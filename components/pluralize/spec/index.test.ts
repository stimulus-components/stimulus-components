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

let input: HTMLInputElement
let value: HTMLElement
let texts: NodeListOf<HTMLElement>

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

      input = document.querySelector<HTMLInputElement>('[data-pluralize-target="input"]')
      texts = document.querySelectorAll<HTMLElement>('[data-pluralize-target="text"]')
      value = document.querySelector<HTMLElement>('[data-pluralize-target="value"]')
    })

    it("should correctly pluralize for 0", (): void => {
      input.value = "0"
      input.dispatchEvent(new Event("input"))

      expect(value.innerHTML).toBe("0")
      expect(texts[0].innerHTML).toBe("are")
      expect(texts[1].innerHTML).toBe("puppies")
    })

    it("should correctly pluralize for 1", (): void => {
      input.value = "1"
      input.dispatchEvent(new Event("input"))

      expect(value.innerHTML).toBe("1")
      expect(texts[0].innerHTML).toBe("is")
      expect(texts[1].innerHTML).toBe("puppy")
    })

    it("should correctly pluralize for 2", (): void => {
      input.value = "2"
      input.dispatchEvent(new Event("input"))

      expect(value.innerHTML).toBe("2")
      expect(texts[0].innerHTML).toBe("are")
      expect(texts[1].innerHTML).toBe("puppies")
    })
  })

  describe("for observation", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
      <div data-controller="pluralize">
        There
        <span data-pluralize-target="text" data-singular="is" data-plural="are"></span>
        <strong data-pluralize-target="observe"></strong>
        <span data-pluralize-target="text" data-singular="puppy" data-plural="puppies"></span>
        to be seen.
      </div>
    `

      texts = document.querySelectorAll<HTMLElement>('[data-pluralize-target="text"]')
      value = document.querySelector<HTMLElement>('[data-pluralize-target="observe"]')
    })

    it("should correctly pluralize for 0", async (): Promise<void> => {
      value.textContent = "0"
      await new Promise(process.nextTick)

      expect(value.innerHTML).toBe("0")
      expect(texts[0].innerHTML).toBe("are")
      expect(texts[1].innerHTML).toBe("puppies")
    })

    it("should correctly pluralize for 1", async (): Promise<void> => {
      value.textContent = "1"
      await new Promise(process.nextTick)

      expect(value.innerHTML).toBe("1")
      expect(texts[0].innerHTML).toBe("is")
      expect(texts[1].innerHTML).toBe("puppy")
    })

    it("should correctly pluralize for 2", async (): Promise<void> => {
      value.textContent = "2"
      await new Promise(process.nextTick)

      expect(value.innerHTML).toBe("2")
      expect(texts[0].innerHTML).toBe("are")
      expect(texts[1].innerHTML).toBe("puppies")
    })
  })
})
