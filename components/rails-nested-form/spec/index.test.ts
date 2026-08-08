/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import RailsNestedForm from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("nested-form", RailsNestedForm)
}

afterEach((): void => {
  application.stop()
})

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
    vi.spyOn(global, "CustomEvent").mockImplementation(function (type: string, eventInit?: CustomEventInit) {
      return { type, eventInit }
    })
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

describe("#remove", (): void => {
  let errors: string[]

  beforeEach((): void => {
    startStimulus()

    errors = []
    application.handleError = (error: Error): void => {
      errors.push(error.message)
    }

    document.body.innerHTML = `
      <form data-controller="nested-form">
        <div id="new" class="nested-form-wrapper" data-new-record="true">
          <button type="button" data-action="nested-form#remove">Remove new</button>
        </div>

        <div id="persisted" class="nested-form-wrapper" data-new-record="false">
          <input type="hidden" name="todos[0][_destroy]" value="0" />
          <button type="button" data-action="nested-form#remove">Remove persisted</button>
        </div>

        <button id="stray" type="button" data-action="nested-form#remove">Remove nothing</button>
      </form>
    `
  })

  it("removes a new record outright", (): void => {
    document.querySelector<HTMLButtonElement>("#new button").click()

    expect(document.querySelector("#new")).toBeNull()
  })

  it("hides a persisted record and flags it for destruction", (): void => {
    document.querySelector<HTMLButtonElement>("#persisted button").click()

    const wrapper: HTMLElement = document.querySelector("#persisted")

    expect(wrapper).not.toBeNull()
    expect(wrapper.style.display).toBe("none")
    expect(wrapper.querySelector<HTMLInputElement>("input").value).toBe("1")
  })

  it("does nothing when the button sits outside any wrapper", (): void => {
    document.querySelector<HTMLButtonElement>("#stray").click()

    expect(document.querySelector("#new")).not.toBeNull()
    expect(document.querySelector("#persisted")).not.toBeNull()
    expect(errors).toEqual([])
  })
})
