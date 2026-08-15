/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import CharacterCounter from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("character-counter", CharacterCounter)
}

afterEach((): void => {
  application.stop()
})

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

  describe("with multibyte characters", () => {
    // A ZWJ sequence: 11 code units, 7 code points, 1 grapheme.
    const family = "👨‍👩‍👧‍👦"

    const render = async (countUnit?: string): Promise<HTMLElement> => {
      startStimulus()

      const countUnitAttribute = countUnit ? `data-character-counter-count-unit-value="${countUnit}"` : ""

      document.body.innerHTML = `
      <div data-controller="character-counter" ${countUnitAttribute}>
        <textarea
          data-character-counter-target="input"
        >${family}</textarea>

        <strong data-character-counter-target="counter"></strong>
      </div>
    `

      // Stimulus connects controllers from a MutationObserver callback.
      await new Promise((resolve): void => {
        setTimeout(resolve, 0)
      })

      return document.querySelector<HTMLElement>('[data-character-counter-target="counter"]')
    }

    it("should count code units by default", async (): Promise<void> => {
      expect((await render()).innerHTML).toBe("11")
    })

    it("should count code points", async (): Promise<void> => {
      expect((await render("code-points")).innerHTML).toBe("7")
    })

    it("should count graphemes", async (): Promise<void> => {
      expect((await render("graphemes")).innerHTML).toBe("1")
    })

    it("should fall back to code units on an unknown count unit", async (): Promise<void> => {
      expect((await render("bytes")).innerHTML).toBe("11")
    })
  })
})
