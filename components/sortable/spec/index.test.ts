/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect } from "vitest"
import { Application } from "@hotwired/stimulus"
import StimulusSortable from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("sortable", StimulusSortable)
}

const getController = (): StimulusSortable => {
  const element = document.querySelector<HTMLElement>('[data-controller="sortable"]')
  return application.getControllerForElementAndIdentifier(element, "sortable") as StimulusSortable
}

afterEach((): void => {
  application.stop()
})

describe("StimulusSortable", () => {
  describe("default options", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
      <ul data-controller="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    `
    })

    it("creates a sortable instance", (): void => {
      const controller = getController()

      expect(controller.sortable).toBeDefined()
    })

    it("uses default animation value", (): void => {
      const controller = getController()

      expect(controller.options.animation).toBe(150)
    })

    it("has no handle by default", (): void => {
      const controller = getController()

      expect(controller.options.handle).toBeUndefined()
    })

    it("has no draggable selector by default", (): void => {
      const controller = getController()

      expect(controller.options.draggable).toBeUndefined()
    })

    it("sortable instance uses >li as default draggable for ul elements", (): void => {
      const controller = getController()

      expect(controller.sortable.options.draggable).toBe(">li")
    })
  })

  describe("default draggable on a div container", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
      <div data-controller="sortable">
        <div>Item 1</div>
        <div>Item 2</div>
      </div>
    `
    })

    it("sortable instance uses >* as default draggable for non-list elements", (): void => {
      const controller = getController()

      expect(controller.sortable.options.draggable).toBe(">*")
    })
  })

  describe("with draggable value", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
      <ul data-controller="sortable" data-sortable-draggable-value=".item">
        <li class="item">Draggable 1</li>
        <li class="item">Draggable 2</li>
        <li class="fixed">Not draggable</li>
      </ul>
    `
    })

    it("passes draggable selector to sortable options", (): void => {
      const controller = getController()

      expect(controller.options.draggable).toBe(".item")
    })
  })

  describe("with handle value", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
      <ul data-controller="sortable" data-sortable-handle-value=".handle">
        <li><span class="handle">drag</span> Item 1</li>
        <li><span class="handle">drag</span> Item 2</li>
      </ul>
    `
    })

    it("passes handle selector to sortable options", (): void => {
      const controller = getController()

      expect(controller.options.handle).toBe(".handle")
    })
  })

  describe("with custom animation", () => {
    beforeEach((): void => {
      startStimulus()

      document.body.innerHTML = `
      <ul data-controller="sortable" data-sortable-animation-value="300">
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    `
    })

    it("uses the provided animation value", (): void => {
      const controller = getController()

      expect(controller.options.animation).toBe(300)
    })
  })
})
