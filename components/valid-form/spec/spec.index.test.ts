/**
 * @jest-environment jsdom
 */
import { describe, it, expect, beforeEach } from "vitest"
import { Application } from "@hotwired/stimulus"
import ValidForm from "../src/index"

describe("ValidForm Controller", () => {
  describe("validates input text", () => {
    let form, input, submit

    beforeEach(() => {
      document.body.innerHTML = `
<form data-controller="valid-form">
  <input type="text" required minlength="4" maxlength="8">
  <input type="submit">
</form>
`

      const application = Application.start()
      application.register("valid-form", ValidForm)

      form = document.querySelector("form")
      input = form.querySelector("input[type='text']")
      submit = form.querySelector("input[type='submit']")
    })

    it("should disable the submit button on initial load", () => {
      expect(submit.disabled).toBe(true)
    })

    it("should enable the submit button when input is valid", () => {
      input.value = "test" // Valid input (minlength=4)
      input.dispatchEvent(new Event("input", { bubbles: true }))

      expect(submit.disabled).toBe(false)
    })

    it("should disable the submit button when input is invalid (too short)", () => {
      input.value = "a" // Too short (minlength=4)
      form.dispatchEvent(new Event("input", { bubbles: true }))

      expect(submit.disabled).toBe(true)
    })

    it("should disable the submit button when input is invalid (too long)", () => {
      input.value = "123456789" // Too long (maxlength=8)
      form.dispatchEvent(new Event("input", { bubbles: true }))

      expect(submit.disabled).toBe(true)
    })
  })

  describe("validates select field", () => {
    let form, select, submit

    beforeEach(() => {
      document.body.innerHTML = `
<form data-controller="valid-form">
  <select id="options" name="options" required>
    <option value="" disabled selected>Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
  <input type="submit">
</form>
`

      const application = Application.start()
      application.register("valid-form", ValidForm)

      form = document.querySelector("form")
      select = form.querySelector("select")
      submit = form.querySelector("input[type='submit']")
    })

    it("should disable the submit button on initial load", () => {
      expect(submit.disabled).toBe(true)
    })

    it("should enable the submit button when an option is selected", () => {
      expect(submit.disabled).toBe(true)
      select.value = "1"
      select.dispatchEvent(new Event("input", { bubbles: true }))

      expect(submit.disabled).toBe(false)
    })
  })
})
