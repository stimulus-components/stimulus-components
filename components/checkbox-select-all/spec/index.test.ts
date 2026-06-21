/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import CheckboxSelectAll from "../src/index"
import { sleep } from "../../../utils"

type CheckboxSelectAllFixtureOptions = {
  checked?: boolean[]
  checkboxAllId?: string
  childCheckboxId?: string
  disableIndeterminate?: boolean
  checkedText?: string | null
  uncheckedText?: string | null
  withLabel?: boolean
  labelText?: string
}

const startStimulus = (): void => {
  const application = Application.start()
  application.register("checkbox-select-all", CheckboxSelectAll)
}

const waitForStimulus = async (): Promise<void> => {
  await sleep(0)
}

const renderCheckboxSelectAllFixture = async ({
  checked = [false, true, false],
  checkboxAllId = "checkbox-select-all",
  childCheckboxId = "checkbox-select-all-child",
  disableIndeterminate = false,
  checkedText = null,
  uncheckedText = null,
  withLabel = false,
  labelText = "Select all",
}: CheckboxSelectAllFixtureOptions = {}): Promise<void> => {
  const formAttributes = [
    'data-controller="checkbox-select-all"',
    disableIndeterminate ? 'data-checkbox-select-all-disable-indeterminate-value="true"' : null,
    checkedText !== null ? `data-checkbox-select-all-checked-text-value="${checkedText}"` : null,
    uncheckedText !== null ? `data-checkbox-select-all-unchecked-text-value="${uncheckedText}"` : null,
  ]
    .filter(Boolean)
    .join(" ")

  const label = withLabel
    ? `
        <label>
          <input id="${checkboxAllId}" type="checkbox" data-checkbox-select-all-target="checkboxAll" />
          <span data-checkbox-select-all-target="label">${labelText}</span>
        </label>
      `
    : ""

  const checkboxAll = withLabel
    ? ""
    : `<input id="${checkboxAllId}" type="checkbox" data-checkbox-select-all-target="checkboxAll" />`

  const checkboxes = checked
    .map((isChecked, index) => {
      const attributes = [
        'type="checkbox"',
        'data-checkbox-select-all-target="checkbox"',
        index === 1 ? `id="${childCheckboxId}"` : null,
        isChecked ? 'checked="checked"' : null,
      ]
        .filter(Boolean)
        .join(" ")

      return `<input ${attributes} />`
    })
    .join("\n")

  document.body.innerHTML = `
    <form ${formAttributes}>
      ${label || checkboxAll}
      ${checkboxes}
    </form>
  `

  await waitForStimulus()
}

beforeEach((): void => {
  globalThis.Node = window.Node
  startStimulus()
})

beforeEach(async (): Promise<void> => {
  await renderCheckboxSelectAllFixture()
})

describe("#toggle", () => {
  it("should select all checkboxes", (): void => {
    const toggleCheckbox = document.querySelector("#checkbox-select-all") as HTMLInputElement
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
    const toggleCheckbox = document.querySelector("#checkbox-select-all") as HTMLInputElement

    expect(toggleCheckbox.checked).toBe(true)
    expect(toggleCheckbox.indeterminate).toBe(true)
  })

  it("updates the label text on connect", async (): Promise<void> => {
    await renderCheckboxSelectAllFixture({
      checkboxAllId: "checkbox-select-all-with-label",
      checkedText: "Unselect all",
      uncheckedText: "Select all",
      withLabel: true,
      labelText: "Select all",
    })

    const label = document.querySelector("[data-checkbox-select-all-target='label']") as HTMLElement

    expect(label.textContent).toBe("Unselect all")
  })

  it("updates the label when toggling select all", async (): Promise<void> => {
    await renderCheckboxSelectAllFixture({
      checkboxAllId: "checkbox-select-all-toggle-label",
      checkedText: "Unselect all",
      uncheckedText: "Select all",
      withLabel: true,
      labelText: "Select all",
    })

    const toggleCheckbox = document.querySelector("#checkbox-select-all-toggle-label") as HTMLInputElement
    const label = document.querySelector("[data-checkbox-select-all-target='label']") as HTMLElement

    toggleCheckbox.click()
    expect(label.textContent).toBe("Select all")

    toggleCheckbox.click()
    expect(label.textContent).toBe("Unselect all")
  })

  it("uses checkedText during partial selection in indeterminate mode", async (): Promise<void> => {
    await renderCheckboxSelectAllFixture({
      checkboxAllId: "checkbox-select-all-partial-label",
      checked: [false, false, false],
      checkedText: "Unselect all",
      uncheckedText: "Select all",
      withLabel: true,
      labelText: "Select all",
    })

    const checkbox = document.querySelector("#checkbox-select-all-child") as HTMLInputElement
    const label = document.querySelector("[data-checkbox-select-all-target='label']") as HTMLElement

    checkbox.click()

    expect(label.textContent).toBe("Unselect all")
  })

  it("does nothing when the label target is absent", (): void => {
    const toggleCheckbox = document.querySelector("#checkbox-select-all") as HTMLInputElement
    const checkedBefore = document.querySelectorAll("[data-checkbox-select-all-target='checkbox']:checked")
    const label = document.querySelector("[data-checkbox-select-all-target='label']")

    expect(checkedBefore).toHaveLength(1)
    expect(label).toBeNull()

    expect((): void => toggleCheckbox.click()).not.toThrow()

    const checkedAfter = document.querySelectorAll("[data-checkbox-select-all-target='checkbox']:checked")

    expect(checkedAfter).toHaveLength(0)
  })

  it("does nothing when one of the text values is missing", async (): Promise<void> => {
    await renderCheckboxSelectAllFixture({
      checkboxAllId: "checkbox-select-all-missing-value",
      checkedText: "Unselect all",
      withLabel: true,
      labelText: "Original label",
    })

    const label = document.querySelector("[data-checkbox-select-all-target='label']") as HTMLElement

    expect(label.textContent).toBe("Original label")
  })

  it("does nothing when the label target is present without text values", async (): Promise<void> => {
    await renderCheckboxSelectAllFixture({
      checkboxAllId: "checkbox-select-all-no-text-values",
      withLabel: true,
      labelText: "Original label",
    })

    const label = document.querySelector("[data-checkbox-select-all-target='label']") as HTMLElement

    expect(label.textContent).toBe("Original label")
  })
})

describe("when disabled indeterminate state", () => {
  beforeEach(async (): Promise<void> => {
    await renderCheckboxSelectAllFixture({ disableIndeterminate: true })
  })

  it("change the checkboxAll state", (): void => {
    const toggleCheckbox = document.querySelector("#checkbox-select-all") as HTMLInputElement

    expect(toggleCheckbox.checked).toBe(false)
    expect(toggleCheckbox.indeterminate).toBe(false)
  })

  it("uses uncheckedText until all boxes are checked when indeterminate is disabled", async (): Promise<void> => {
    await renderCheckboxSelectAllFixture({
      checkboxAllId: "checkbox-select-all-disabled-label",
      disableIndeterminate: true,
      checkedText: "Unselect all",
      uncheckedText: "Select all",
      withLabel: true,
      labelText: "Select all",
    })

    const label = document.querySelector("[data-checkbox-select-all-target='label']") as HTMLElement

    expect(label.textContent).toBe("Select all")
  })
})
