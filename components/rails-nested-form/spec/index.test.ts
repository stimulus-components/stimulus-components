/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import RailsNestedForm from "../src/index"
import RailsNestedFormX from "./rails_nested_form_x"
import RailsNestedFormY from "./rails_nested_form_y"

describe("#nestedForm", (): void => {
  describe("with one nesting level", () => {
    const startStimulus = (): void => {
      const application = Application.start()
      application.register("nested-form", RailsNestedForm)
    }

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

  describe("with two or more nesting levels", () => {
    const startStimulus = (): void => {
      const application = Application.start()
      application.register("nested-form-x", RailsNestedFormX)
      application.register("nested-form-y", RailsNestedFormY)
    }

    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
        <form data-controller="nested-form-x">
          <template data-nested-form-x-target="template">
            <div class="nested-form-wrapper" data-new-record="true">
              <label for="campaign_urls_attributes_NEW_RECORD_name">New url</label>
              <input type="url" name="campaign[urls_attributes][NEW_RECORD][name]" id="campaign_urls_attributes_NEW_RECORD_name">

              <div data-controller="nested-form-y">
                <template data-nested-form-y-target="template">
                  <div class="nested-form-wrapper" data-new-record="true">
                    <label for="campaign_urls_attributes_NEW_RECORD_keywords_attributes_NEW_RECORD_name">New keyword</label>
                    <input type="text" name="campaign[urls_attributes][NEW_RECORD][keywords_attributes][NEW_RECORD][name]" id="campaign_urls_attributes_NEW_RECORD_keywords_attributes_NEW_RECORD_name">
                  </div>
                </template>

                <div data-nested-form-y-target="target"></div>

                <button type="button" data-action="nested-form-y#add">Add todo</button>
              </div>
            </div>
          </template>

          <div>
            <label>Your url</label>
          </div>

          <div data-nested-form-x-target="target"></div>

          <button type="button" data-action="nested-form-x#add">Add url</button>
        </form>
      `
    })

    it("should create new url, not messing with the nested y form", (): void => {
      const target: HTMLElement = document.querySelector("[data-nested-form-x-target='target']")
      const addButton: HTMLButtonElement = document.querySelector("[data-action='nested-form-x#add']")

      expect(target.previousElementSibling?.innerHTML).toContain("Your url")

      addButton.click()

      // Ensures the timestamp is generated
      const generatedHtml: String = target.previousElementSibling?.innerHTML || ""
      const timestampMatch = generatedHtml.match(/campaign_urls_attributes_(\d+)_keywords_attributes_NEW_RECORD_name/)
      expect(timestampMatch).not.toBeNull()

      const timestamp = timestampMatch ? timestampMatch[1] : ""
      expect(timestamp).not.toBe("")

      // Check that the timestamp appears for id and for attributes, and is not applied on nested NEW_RECORD
      expect(
        (
          target.previousElementSibling?.innerHTML.match(
            new RegExp(`campaign_urls_attributes_${timestamp}_keywords_attributes_NEW_RECORD_name`, "g"),
          ) || []
        ).length,
      ).toBe(2)

      // Check that the bracket notation appears once
      expect(target.previousElementSibling?.innerHTML).toContain(
        `campaign[urls_attributes][${timestamp}][keywords_attributes][NEW_RECORD][name]`,
      )

      // Original assertion
      expect(target.previousElementSibling?.innerHTML).toContain("New url")
    })

    it("should dispatch events", (): void => {
      const controllerElement: HTMLButtonElement = document.querySelector("[data-controller='nested-form-x']")
      const addButton: HTMLButtonElement = document.querySelector("[data-action='nested-form-x#add']")

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
})
