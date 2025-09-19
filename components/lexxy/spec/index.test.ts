/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import Lexxy from "../src/"

let application: Application

const startStimulus = () => {
  application = Application.start()
  application.register("lexxy", Lexxy)
}

// Helper function to create mock files
const createMockFile = (name: string, type: string, size: number): File => {
  const file = new File([""], name, { type })
    Object.defineProperty(file, "size", {
    value: size,
    writable: false
  })
  return file
}

// Helper function to dispatch lexxy:file-accept event
const dispatchFileAcceptEvent = (element: HTMLElement, file: File) => {
  const event = new CustomEvent("lexxy:file-accept", {
    detail: { file },
    bubbles: true,
    cancelable: true
  })
  element.dispatchEvent(event)
  return event
}

describe("Lexxy Controller", () => {
  let element: HTMLElement

  beforeEach(async () => {
    startStimulus()

    document.body.innerHTML = `
      <lexxy-editor
        name="content"
        data-controller="lexxy"
      ></lexxy-editor>
    `
    element = document.querySelector("[data-controller=\"lexxy\"]") as HTMLElement

    // Wait for controller to be connected
    await new Promise(resolve => setTimeout(resolve, 0))
  })

  afterEach(() => {
    if (application) {
      application.stop()
    }
    document.body.innerHTML = ""
  })

  describe("initialization", () => {
    it("should connect successfully", () => {
      expect(element).toBeTruthy()
      expect(element.dataset.controller).toBe("lexxy")
    })
  })

  describe("file type validation", () => {
    it("should allow valid file types", () => {
      const validFiles = [
        createMockFile("image.jpg", "image/jpeg", 1024),
        createMockFile("image.png", "image/png", 1024),
        createMockFile("document.pdf", "application/pdf", 1024)
      ]

      validFiles.forEach(file => {
        const eventSpy = vi.fn()
        element.addEventListener("lexxy:invalid-type", eventSpy)

        const event = dispatchFileAcceptEvent(element, file)

        expect(eventSpy).not.toHaveBeenCalled()
        expect(event.defaultPrevented).toBe(false)

        element.removeEventListener("lexxy:invalid-type", eventSpy)
      })
    })

    it("should reject invalid file types", () => {
      const invalidFile = createMockFile("document.txt", "text/plain", 1024)
      const eventSpy = vi.fn()
      element.addEventListener("lexxy:invalid-type", eventSpy)

      const event = dispatchFileAcceptEvent(element, invalidFile)

      expect(event.defaultPrevented).toBe(true)
      expect(eventSpy).toHaveBeenCalledOnce()

      const eventDetail = eventSpy.mock.calls[0][0].detail
      expect(eventDetail.file).toBe(invalidFile)
      expect(eventDetail.allowedTypes).toEqual(["image/jpeg", "image/png", "application/pdf"])
      expect(eventDetail.message).toBe("File type not allowed. We only accept image/jpeg, image/png, application/pdf.")
    })

    it("should reject files with no type", () => {
      const invalidFile = createMockFile("document", "", 1024)
      const eventSpy = vi.fn()
      element.addEventListener("lexxy:invalid-type", eventSpy)

      const event = dispatchFileAcceptEvent(element, invalidFile)

      expect(event.defaultPrevented).toBe(true)
      expect(eventSpy).toHaveBeenCalledOnce()
    })
  })

  describe("file size validation", () => {
    it("should allow files within size limit", () => {
      const validFile = createMockFile("image.jpg", "image/jpeg", 3 * 1024 * 1024) // 3MB
      const eventSpy = vi.fn()
      element.addEventListener("lexxy:invalid-size", eventSpy)

      const event = dispatchFileAcceptEvent(element, validFile)

      expect(eventSpy).not.toHaveBeenCalled()
      expect(event.defaultPrevented).toBe(false)
    })

    it("should reject files exceeding size limit", () => {
      const oversizedFile = createMockFile("image.jpg", "image/jpeg", 10 * 1024 * 1024) // 10MB
      const eventSpy = vi.fn()
      element.addEventListener("lexxy:invalid-size", eventSpy)

      const event = dispatchFileAcceptEvent(element, oversizedFile)

      expect(event.defaultPrevented).toBe(true)
      expect(eventSpy).toHaveBeenCalledOnce()

      const eventDetail = eventSpy.mock.calls[0][0].detail
      expect(eventDetail.file).toBe(oversizedFile)
      expect(eventDetail.maxBytes).toBe(5 * 1024 * 1024)
      expect(eventDetail.maxMB).toBe(5.0)
      expect(eventDetail.message).toBe("File too large. Maximum 5 MB allowed.")
    })

    it("should handle exact size limit", () => {
      const exactSizeFile = createMockFile("image.jpg", "image/jpeg", 5 * 1024 * 1024) // Exactly 5MB
      const eventSpy = vi.fn()
      element.addEventListener("lexxy:invalid-size", eventSpy)

      const event = dispatchFileAcceptEvent(element, exactSizeFile)

      expect(eventSpy).not.toHaveBeenCalled()
      expect(event.defaultPrevented).toBe(false)
    })
  })

  describe("custom configuration", () => {
    it("should use custom max bytes and types", async () => {
      document.body.innerHTML = `
        <lexxy-editor
          name="content"
          data-controller="lexxy"
          data-lexxy-max-bytes-value="1572864"
          data-lexxy-types-value="[&quot;image/gif&quot;]"
        ></lexxy-editor>
      `
      const customElement = document.querySelector("[data-controller=\"lexxy\"]") as HTMLElement
      await new Promise(resolve => setTimeout(resolve, 0))

      // Test custom size limit (1.5MB)
      const oversizedFile = createMockFile("image.gif", "image/gif", 2 * 1024 * 1024) // 2MB
      const sizeEventSpy = vi.fn()
      customElement.addEventListener("lexxy:invalid-size", sizeEventSpy)

      dispatchFileAcceptEvent(customElement, oversizedFile)

      expect(sizeEventSpy).toHaveBeenCalledOnce()
      const sizeEventDetail = sizeEventSpy.mock.calls[0][0].detail
      expect(sizeEventDetail.maxMB).toBe(1.5)
      expect(sizeEventDetail.message).toBe("File too large. Maximum 1.5 MB allowed.")

      // Test custom allowed types (only GIF)
      const wrongTypeFile = createMockFile("image.jpg", "image/jpeg", 1024)
      const typeEventSpy = vi.fn()
      customElement.addEventListener("lexxy:invalid-type", typeEventSpy)

      dispatchFileAcceptEvent(customElement, wrongTypeFile)

      expect(typeEventSpy).toHaveBeenCalledOnce()
      const typeEventDetail = typeEventSpy.mock.calls[0][0].detail
      expect(typeEventDetail.allowedTypes).toEqual(["image/gif"])
    })
  })

  describe("attachments disabled", () => {
    it("should not process file events when attachments are disabled", async () => {
      document.body.innerHTML = `
        <lexxy-editor
          name="content"
          data-controller="lexxy"
          attachments="false"
        ></lexxy-editor>
      `
      const disabledElement = document.querySelector("[data-controller=\"lexxy\"]") as HTMLElement
      await new Promise(resolve => setTimeout(resolve, 0))

      const mockFile = createMockFile("test.jpg", "image/jpeg", 1024)
      const eventSpy = vi.fn()
      disabledElement.addEventListener("lexxy:invalid-type", eventSpy)

      const event = dispatchFileAcceptEvent(disabledElement, mockFile)

      expect(eventSpy).not.toHaveBeenCalled()
      expect(event.defaultPrevented).toBe(false)
    })
  })

  describe("combined validation", () => {
    it("should check type before size", () => {
      const invalidFile = createMockFile("document.txt", "text/plain", 10 * 1024 * 1024) // 10MB text file
      const typeSpy = vi.fn()
      const sizeSpy = vi.fn()

      element.addEventListener("lexxy:invalid-type", typeSpy)
      element.addEventListener("lexxy:invalid-size", sizeSpy)

      const event = dispatchFileAcceptEvent(element, invalidFile)

      expect(event.defaultPrevented).toBe(true)
      expect(typeSpy).toHaveBeenCalledOnce()
      expect(sizeSpy).not.toHaveBeenCalled() // Should not check size if type is invalid
    })

    it("should check size if type is valid but file is too large", () => {
      const invalidFile = createMockFile("image.jpg", "image/jpeg", 10 * 1024 * 1024) // 10MB JPEG
      const typeSpy = vi.fn()
      const sizeSpy = vi.fn()

      element.addEventListener("lexxy:invalid-type", typeSpy)
      element.addEventListener("lexxy:invalid-size", sizeSpy)

      const event = dispatchFileAcceptEvent(element, invalidFile)

      expect(event.defaultPrevented).toBe(true)
      expect(typeSpy).not.toHaveBeenCalled()
      expect(sizeSpy).toHaveBeenCalledOnce()
    })
  })

  describe("edge cases", () => {
    it("should handle events without file detail", () => {
      const event = new CustomEvent("lexxy:file-accept", {
        detail: {},
        bubbles: true,
        cancelable: true
      })

      const typeSpy = vi.fn()
      const sizeSpy = vi.fn()
      element.addEventListener("lexxy:invalid-type", typeSpy)
      element.addEventListener("lexxy:invalid-size", sizeSpy)

      element.dispatchEvent(event)

      expect(typeSpy).not.toHaveBeenCalled()
      expect(sizeSpy).not.toHaveBeenCalled()
      expect(event.defaultPrevented).toBe(false)
    })

    it("should handle events with null file", () => {
      const event = new CustomEvent("lexxy:file-accept", {
        detail: { file: null },
        bubbles: true,
        cancelable: true
      })

      const typeSpy = vi.fn()
      element.addEventListener("lexxy:invalid-type", typeSpy)

      element.dispatchEvent(event)

      expect(typeSpy).not.toHaveBeenCalled()
      expect(event.defaultPrevented).toBe(false)
    })
  })
})
