/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import Reveal from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("reveal", Reveal)
}

afterEach((): void => {
  application.stop()
})

beforeEach((): void => {
  startStimulus()

  document.body.innerHTML = `
    <div data-controller="reveal">
      <button data-action="click->reveal#toggle" type="button" aria-expanded="false">Toggle me!</button>
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

  it("should keep the aria-expanded attribute in sync", () => {
    const button: HTMLButtonElement = document.querySelector("button")

    expect(button.getAttribute("aria-expanded")).toEqual("false")
    button.click()
    expect(button.getAttribute("aria-expanded")).toEqual("true")
    button.click()
    expect(button.getAttribute("aria-expanded")).toEqual("false")
  })

  describe("without an aria-expanded attribute", () => {
    beforeEach((): void => {
      document.body.innerHTML = `
        <div data-controller="reveal">
          <button data-action="click->reveal#toggle" type="button">Toggle me!</button>
          <p data-reveal-target="item" class="hidden">Hey 👋</p>
        </div>
      `
    })

    it("should not add the attribute to the trigger", () => {
      const button: HTMLButtonElement = document.querySelector("button")
      const hidden: HTMLElement = document.querySelector("p")

      button.click()

      expect(button.hasAttribute("aria-expanded")).toBe(false)
      expect(hidden.className).not.toContain("hidden")
    })
  })
})

describe("#show", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div data-controller="reveal">
        <button data-action="click->reveal#show" type="button" aria-expanded="false">Show me!</button>
        <p data-reveal-target="item" class="hidden">Hey 👋</p>
      </div>
    `
  })

  it("should reveal the target and set aria-expanded to true", () => {
    const button: HTMLButtonElement = document.querySelector("button")
    const hidden: HTMLElement = document.querySelector("p")

    button.click()

    expect(hidden.className).not.toContain("hidden")
    expect(button.getAttribute("aria-expanded")).toEqual("true")

    button.click()

    expect(hidden.className).not.toContain("hidden")
    expect(button.getAttribute("aria-expanded")).toEqual("true")
  })
})

describe("#hide", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div data-controller="reveal">
        <button data-action="click->reveal#hide" type="button" aria-expanded="true">Hide me!</button>
        <p data-reveal-target="item">Hey 👋</p>
      </div>
    `
  })

  it("should hide the target and set aria-expanded to false", () => {
    const button: HTMLButtonElement = document.querySelector("button")
    const hidden: HTMLElement = document.querySelector("p")

    button.click()

    expect(hidden.className).toContain("hidden")
    expect(button.getAttribute("aria-expanded")).toEqual("false")
  })
})
