/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import CharacterCounter from "../src/index"

const startStimulus = (): void => {
  const application = Application.start()
  application.register("character-counter", CharacterCounter)
}

describe("#update", () => {
  describe("in normal mode", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
      <div data-controller="character-counter">
        <textarea 
          data-character-counter-target="input"
        >${"a".repeat(1250)}</textarea>

        <strong data-character-counter-target="counter"></strong>
      </div>
    `
    })

    it("should returns count", (): void => {
      const content = document.querySelector<HTMLElement>('[data-character-counter-target="counter"]')

      expect(content.innerHTML).toBe("1,250")
    })
  })

  describe("in countdown mode", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
      <div data-controller="character-counter" data-character-counter-countdown-value="true">
        <textarea 
          data-character-counter-target="input" 
          maxlength="280"
        >${"a".repeat(180)}</textarea>

        <strong data-character-counter-target="counter"></strong>
      </div>
    `
    })

    it("should returns count", (): void => {
      const content = document.querySelector<HTMLElement>('[data-character-counter-target="counter"]')

      expect(content.innerHTML).toBe("100")
    })
  })
})
