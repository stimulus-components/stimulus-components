/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import PasswordVisibility from "../src/index"

let application: Application

const startStimulus = () => {
  application = Application.start()
  application.register("password-visibility", PasswordVisibility)
}

afterEach(() => {
  application.stop()
})

describe("#load", () => {
  beforeEach(() => {
    startStimulus()

    document.body.innerHTML = `
    <div data-controller="password-visibility">
      <input type="password" data-password-visibility-target="input" />

      <button type="button" data-action="password-visibility#toggle">
        <span data-password-visibility-target="icon">Eye</span>
        <span data-password-visibility-target="icon" class="hidden">Eye Slash</span>
      </button>
    </div>
    `
  })

  it("toggles the password visibility", async () => {
    const input: HTMLInputElement = document.querySelector("input")
    const button: HTMLButtonElement = document.querySelector("button")
    const hiddenIcon: HTMLElement = document.querySelector('[data-password-visibility-target="icon"]')
    const visibleIcon: HTMLElement = document.querySelector('.hidden[data-password-visibility-target="icon"]')

    expect(input.type).toBe("password")

    expect(hiddenIcon.classList.contains("hidden")).toBe(false)
    expect(visibleIcon.classList.contains("hidden")).toBe(true)

    button.click()

    expect(input.type).toBe("text")
    expect(hiddenIcon.classList.contains("hidden")).toBe(true)
    expect(visibleIcon.classList.contains("hidden")).toBe(false)
  })
})
