/**
 * @jest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import RailsNestedForm from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("nested-form", RailsNestedForm)
}

describe("#nestedForm", (): void => {
  afterEach((): void => {
    application.stop()
  })

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

describe("#deeplyNestedForms", (): void => {
  afterEach((): void => {
    application.stop()
  })

  beforeEach((): void => {
    startStimulus()

    document.body.innerHTML = `
      <form data-controller="nested-form" data-nested-form-new-record-placeholder-value="NEW_OUTER_RECORD">
        <template data-nested-form-target="template">
          <div class="nested-form-wrapper" data-new-record="true">
            <input name="project[NEW_OUTER_RECORD][title]" />

            <div data-controller="nested-form">
              <template data-nested-form-target="template">
                <div class="nested-form-wrapper" data-new-record="true">
                  <input name="project[NEW_OUTER_RECORD][tasks][NEW_RECORD][title]" />
                </div>
              </template>
              <div data-nested-form-target="target"></div>
              <button type="button" data-action="nested-form#add">Add task</button>
            </div>
          </div>
        </template>

        <div data-nested-form-target="target"></div>
        <button type="button" data-action="nested-form#add">Add project</button>
      </form>
    `
  })

  it("should replace outer placeholder but preserve inner placeholder", (): void => {
    const form = document.querySelector("form[data-controller='nested-form']")
    const controller = application.getControllerForElementAndIdentifier(form, "nested-form")

    // Mock Date.now() to return a predictable timestamp
    const mockTimestamp = "1234567890"
    vi.spyOn(Date.prototype, "getTime").mockReturnValue(parseInt(mockTimestamp))

    // Mock the problematic DOM methods to avoid JSDOM issues
    const mockInsertAdjacentHTML = vi.fn()
    const mockDispatchEvent = vi.fn()
    controller.targetTarget.insertAdjacentHTML = mockInsertAdjacentHTML
    controller.element.dispatchEvent = mockDispatchEvent

    // Call the add method directly
    const event = new MouseEvent("click", { bubbles: true })
    controller.add(event)

    // Verify the replacement logic worked correctly
    expect(mockInsertAdjacentHTML).toHaveBeenCalledWith(
      "beforebegin",
      expect.stringContaining("project[1234567890][title]"),
    )
    expect(mockInsertAdjacentHTML).toHaveBeenCalledWith(
      "beforebegin",
      expect.stringContaining("project[1234567890][tasks][NEW_RECORD][title]"),
    )
    expect(mockInsertAdjacentHTML).toHaveBeenCalledWith("beforebegin", expect.not.stringContaining("NEW_OUTER_RECORD"))
  })
})
