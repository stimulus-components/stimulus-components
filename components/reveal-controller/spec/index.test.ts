/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import Reveal from "../src/index"

const startStimulus = (): void => {
  const application = Application.start()
  application.register("reveal", Reveal)
}

beforeEach((): void => {
  startStimulus()

  document.body.innerHTML = `
    <div data-controller="reveal">
      <button data-action="click->reveal#toggle" type="button">Toggle me!</button>
      <p data-reveal-target="item" class="hidden">Hey 👋</p>
    </div>
  `
})

describe("#toggle", () => {
  it("should reveal the target", () => {
    const button: HTMLButtonElement = document.querySelector("button")
    const hidden: HTMLElement = document.querySelector("p")

    expect(hidden.className).toContain("hidden")
    button.click()
    expect(hidden.className).not.toContain("hidden")
    button.click()
    expect(hidden.className).toContain("hidden")
  })
})
