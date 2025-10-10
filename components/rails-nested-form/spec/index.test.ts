/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import RailsNestedForm from "../src/index"

const startStimulus = (): void => {
  const application = Application.start()
  application.register("nested-form", RailsNestedForm)
}

describe("#nestedForm", (): void => {
  beforeEach((): void => {
    startStimulus()

    document.body.innerHTML = `
      <form data-controller="nested-form">
        <template data-nested-form-target="template">
          <div class="nested-form-wrapper" data-new-record="true">
            <label for="NEW_RECORD">New todo</label>
          </div>
        </template>

        <div>
          <label>Your todo</label>
        </div>

        <div data-nested-form-target="target"></div>

        <button type="button" data-action="nested-form#add">Add todo</button>
      </form>
    `
  })

  it("should create new todo", (): void => {
    const target: HTMLElement = document.querySelector("[data-nested-form-target='target']")
    const addButton: HTMLButtonElement = document.querySelector("[data-action='nested-form#add']")

    expect(target.previousElementSibling.innerHTML).toContain("Your todo")

    addButton.click()

    expect(target.previousElementSibling.innerHTML).toContain("New todo")
  })

  it("should dispatch events", (): void => {
    const controllerElement: HTMLButtonElement = document.querySelector("[data-controller='nested-form']")
    const addButton: HTMLButtonElement = document.querySelector("[data-action='nested-form#add']")

    // @ts-expect-error
    vi.spyOn(global, "CustomEvent").mockImplementation((type: string, eventInit?: any) => ({ type, eventInit }))
    const mockDispatchEvent = vi.spyOn(controllerElement, "dispatchEvent").mockImplementation(() => true)

    addButton.click()

    expect(mockDispatchEvent).toHaveBeenCalledWith({
      type: "rails-nested-form:add",
      eventInit: {
        bubbles: true,
      },
    })
  })
})

describe("#deeplyNestedForm", (): void => {
  beforeEach((): void => {
    startStimulus()

    document.body.innerHTML = `
      <form data-controller="nested-form" data-nested-form-new-record-placeholder-value="NEW_OUTER_RECORD">
        <template data-nested-form-target="template">
          <div class="nested-form-wrapper" data-new-record="true">
            <label for="NEW_OUTER_RECORD">New todo</label>

            <div data-controller="nested-form">
              <div class="nested-form-wrapper" data-new-record="true">
                <label for="NEW_RECORD">New todo</label>
              </div>
            </div>
          </div>
        </template>

        <div>
          <label>Your todo</label>
        </div>

        <div data-nested-form-target="target"></div>

        <button type="button" data-action="nested-form#add">Add todo</button>
      </form>
    `
  })

  it("retains new record placeholder in deeply nested forms", (): void => {
    const addButton: HTMLButtonElement = document.querySelector("[data-action='nested-form#add']")
    expect(document.querySelector("form[data-controller='nested-form']").innerHTML).toContain("NEW_RECORD")

    addButton.click()

    expect(document.querySelector("div[data-controller='nested-form']").innerHTML).toContain("NEW_RECORD")
  })
})
