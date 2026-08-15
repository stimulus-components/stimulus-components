/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import CheckboxSelectAll from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("checkbox-select-all", CheckboxSelectAll)
}

afterEach((): void => {
  application.stop()
})

beforeEach((): void => {
  startStimulus()

  document.body.innerHTML = `
    <form data-controller="checkbox-select-all">
      <input id="checkbox-select-all" type="checkbox" data-checkbox-select-all-target="checkboxAll" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" checked="checked" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" />
    </form>
  `
})

describe("#toggle", () => {
  it("should select all checkboxes", (): void => {
    const toggleCheckbox: HTMLInputElement = document.querySelector("#checkbox-select-all")
    const targetsBefore: NodeList = document.querySelectorAll("[data-checkbox-select-all-target='checkbox']:checked")

    expect(targetsBefore.length).toBe(1)

    // Uncheck all
    toggleCheckbox.click()

    // Check all
    toggleCheckbox.click()

    const targetsAfter: NodeList = document.querySelectorAll("[data-checkbox-select-all-target='checkbox']:checked")

    expect(targetsAfter.length).toBe(3)
  })
})

describe("#refresh", () => {
  it("change the checkboxAll state", (): void => {
    const toggleCheckbox: HTMLInputElement = document.querySelector("#checkbox-select-all")

    expect(toggleCheckbox.checked).toBe(true)
    expect(toggleCheckbox.indeterminate).toBe(true)
  })
})

describe("without a checkboxAll target", () => {
  // Stimulus processes DOM mutations from a MutationObserver callback, so the
  // target lifecycle runs a microtask after innerHTML is assigned.
  const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

  let controller: CheckboxSelectAll

  beforeEach(async (): Promise<void> => {
    document.body.innerHTML = `
      <form id="form" data-controller="checkbox-select-all">
        <input id="checkbox" type="checkbox" data-checkbox-select-all-target="checkbox" />
      </form>
    `

    await flush()

    controller = application.getControllerForElementAndIdentifier(
      document.querySelector("#form"),
      "checkbox-select-all",
    ) as CheckboxSelectAll
  })

  it("connects the controller", (): void => {
    expect(controller).not.toBeNull()
  })

  it("refreshes without raising", (): void => {
    expect((): void => controller.refresh()).not.toThrow()
  })
})

describe("with disabled checkboxes", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
    <form data-controller="checkbox-select-all">
      <input id="checkbox-select-all" type="checkbox" data-checkbox-select-all-target="checkboxAll" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" checked="checked" />
      <input id="disabled-unchecked" type="checkbox" data-checkbox-select-all-target="checkbox" disabled="disabled" />
      <input
        id="disabled-checked"
        type="checkbox"
        data-checkbox-select-all-target="checkbox"
        checked="checked"
        disabled="disabled"
      />
    </form>
  `
  })

  it("does not check the disabled checkboxes", (): void => {
    const toggleCheckbox: HTMLInputElement = document.querySelector("#checkbox-select-all")
    const disabledUnchecked: HTMLInputElement = document.querySelector("#disabled-unchecked")

    // Uncheck all
    toggleCheckbox.click()

    // Check all
    toggleCheckbox.click()

    expect(disabledUnchecked.checked).toBe(false)
    expect(document.querySelectorAll("[data-checkbox-select-all-target='checkbox']:checked").length).toBe(3)
  })

  it("does not uncheck the disabled checkboxes", (): void => {
    const toggleCheckbox: HTMLInputElement = document.querySelector("#checkbox-select-all")
    const disabledChecked: HTMLInputElement = document.querySelector("#disabled-checked")

    // Uncheck all
    toggleCheckbox.click()

    expect(disabledChecked.checked).toBe(true)
    expect(document.querySelectorAll("[data-checkbox-select-all-target='checkbox']:checked").length).toBe(1)
  })

  it("stays unchecked when only a disabled checkbox is checked", (): void => {
    const toggleCheckbox: HTMLInputElement = document.querySelector("#checkbox-select-all")

    // Uncheck all
    toggleCheckbox.click()

    // The next click must check the enabled checkboxes again, and not uncheck them.
    expect(toggleCheckbox.checked).toBe(false)
    expect(toggleCheckbox.indeterminate).toBe(true)
  })

  it("keeps the indeterminate state when a disabled checkbox stays unchecked", (): void => {
    const toggleCheckbox: HTMLInputElement = document.querySelector("#checkbox-select-all")

    // Uncheck all
    toggleCheckbox.click()

    // Check all
    toggleCheckbox.click()

    expect(toggleCheckbox.checked).toBe(true)
    expect(toggleCheckbox.indeterminate).toBe(true)
  })
})

describe("when ignoring the disabled checkboxes", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
    <form data-controller="checkbox-select-all" data-checkbox-select-all-ignore-disabled-value="true">
      <input id="checkbox-select-all" type="checkbox" data-checkbox-select-all-target="checkboxAll" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" checked="checked" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" disabled="disabled" />
    </form>
  `
  })

  it("removes the indeterminate state when all the enabled checkboxes are checked", (): void => {
    const toggleCheckbox: HTMLInputElement = document.querySelector("#checkbox-select-all")

    // Uncheck all
    toggleCheckbox.click()

    // Check all
    toggleCheckbox.click()

    expect(toggleCheckbox.checked).toBe(true)
    expect(toggleCheckbox.indeterminate).toBe(false)
  })

  it("stays unchecked when all the checkboxes are disabled", (): void => {
    document.body.innerHTML = `
    <form data-controller="checkbox-select-all" data-checkbox-select-all-ignore-disabled-value="true">
      <input id="all-disabled" type="checkbox" data-checkbox-select-all-target="checkboxAll" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" checked="checked" disabled="disabled" />
    </form>
  `

    const toggleCheckbox: HTMLInputElement = document.querySelector("#all-disabled")

    expect(toggleCheckbox.checked).toBe(false)
    expect(toggleCheckbox.indeterminate).toBe(false)
  })
})

describe("when disabled indeterminate state", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
    <form data-controller="checkbox-select-all" data-checkbox-select-all-disable-indeterminate-value="true">
      <input id="checkbox-select-all" type="checkbox" data-checkbox-select-all-target="checkboxAll" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" checked="checked" />
      <input type="checkbox" data-checkbox-select-all-target="checkbox" />
    </form>
  `
  })

  it("change the checkboxAll state", (): void => {
    const toggleCheckbox: HTMLInputElement = document.querySelector("#checkbox-select-all")

    expect(toggleCheckbox.checked).toBe(false)
    expect(toggleCheckbox.indeterminate).toBe(false)
  })
})
