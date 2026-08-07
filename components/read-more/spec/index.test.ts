/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import ReadMore from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("read-more", ReadMore)
}

afterEach((): void => {
  application.stop()
})

beforeEach((): void => {
  startStimulus()

  document.body.innerHTML = `
    <div
      data-controller="read-more"
      data-read-more-more-text-value="Read more"
      data-read-more-less-text-value="Read less"
    >
      <p data-read-more-target="content">Lorem ipsum dolor sit amet.</p>
      <button id="toggle" type="button" data-action="read-more#toggle">Read more</button>
    </div>
  `
})

const button = (): HTMLButtonElement => document.querySelector("#toggle")
const content = (): HTMLElement => document.querySelector("[data-read-more-target='content']")

describe("#toggle", () => {
  it("expands the content on the first click", (): void => {
    expect(content().style.getPropertyValue("--read-more-line-clamp")).toBe("")

    button().click()

    expect(content().style.getPropertyValue("--read-more-line-clamp")).toBe("'unset'")
    expect(button().innerHTML).toBe("Read less")
  })

  it("collapses the content on the second click", (): void => {
    button().click()
    button().click()

    expect(content().style.getPropertyValue("--read-more-line-clamp")).toBe("")
    expect(button().innerHTML).toBe("Read more")
  })

  it("keeps alternating across repeated clicks", (): void => {
    for (let i = 0; i < 3; i++) {
      button().click()
      expect(button().innerHTML).toBe("Read less")

      button().click()
      expect(button().innerHTML).toBe("Read more")
    }
  })
})

describe("with more than one trigger", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div
        data-controller="read-more"
        data-read-more-more-text-value="Read more"
        data-read-more-less-text-value="Read less"
      >
        <p data-read-more-target="content">Lorem ipsum dolor sit amet.</p>
        <button id="toggle" type="button" data-action="read-more#toggle">Read more</button>
        <button id="other" type="button" data-action="read-more#toggle">Read more</button>
      </div>
    `
  })

  it("rewrites only the clicked trigger", (): void => {
    // show()/hide() write to event.target, not to a target element, so the
    // button that was not clicked keeps its original label.
    button().click()

    expect(button().innerHTML).toBe("Read less")
    expect(document.querySelector("#other").innerHTML).toBe("Read more")
    expect(content().style.getPropertyValue("--read-more-line-clamp")).toBe("'unset'")
  })
})
