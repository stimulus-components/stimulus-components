/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import RadioUncheck from "../src/index"

const startStimulus = (): void => {
  const application = Application.start()
  application.register("radio-uncheck", RadioUncheck)
}

beforeEach((): void => {
  startStimulus()

  document.body.innerHTML = `
    <form data-controller="radio-uncheck">
      <input data-radio-uncheck-target="radio" id="team-1" name="team" type="radio">
      <label for="team-1">Team 1</label>

      <input data-radio-uncheck-target="radio" id="team-2" name="team" type="radio">
      <label for="team-2">Team 2</label>

      <input data-radio-uncheck-target="radio" id="team-3" name="team" type="radio">
      <label for="team-3">Team 3</label>

      <button type="button" data-action="radio-uncheck#uncheck">Uncheck</button>
    </form>
  `
})

describe("#uncheck", () => {
  it("should uncheck all radio buttons", (): void => {
    const uncheckButton: HTMLButtonElement = document.querySelector("[data-action='radio-uncheck#uncheck']")
    const radios: HTMLInputElement[] = [
      document.querySelector("#team-1"),
      document.querySelector("#team-2"),
      document.querySelector("#team-3"),
    ]

    radios.forEach((radioToCheck) => {
      radioToCheck.checked = true
      uncheckButton.click()
      radios.forEach((radio) => {
        expect(radio.checked).toBe(false)
      })
    })
  })
})
