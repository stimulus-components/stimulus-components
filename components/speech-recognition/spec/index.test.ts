/**
 * @jest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { Application } from "@hotwired/stimulus"
import SpeechRecognitionController from "../src/index"

const mockRecognition = () => {
  const instance = {
    continuous: false,
    interimResults: false,
    start: vi.fn(),
    stop: vi.fn(),
    abort: vi.fn(),
    onresult: null as ((event: unknown) => void) | null,
    onend: null as (() => void) | null,
    onerror: null as ((event: unknown) => void) | null,
  }

  const MockSpeechRecognition = vi.fn(function (this: typeof instance) {
    return instance
  })

  Object.defineProperty(window, "SpeechRecognition", {
    value: MockSpeechRecognition,
    writable: true,
    configurable: true,
  })

  return instance
}

const clearSpeechRecognition = (): void => {
  delete (window as Partial<Window>).SpeechRecognition
  delete (window as Partial<Window>).webkitSpeechRecognition
}

const $ = (selector: string): HTMLElement => document.querySelector(selector) as HTMLElement
const $btn = (selector: string): HTMLButtonElement => document.querySelector(selector) as HTMLButtonElement

const buildHTML = ({ withIndicator = true, hiddenClass = "d-none" } = {}): string => {
  const attr = hiddenClass ? ` data-speech-recognition-hidden-class="${hiddenClass}"` : ""
  const hidden = hiddenClass || "hidden"
  return `
  <div data-controller="speech-recognition"${attr}>
    <textarea data-speech-recognition-target="input"></textarea>
    <button data-speech-recognition-target="startButton" data-action="click->speech-recognition#start" class="${hidden}">Start</button>
    <button data-speech-recognition-target="stopButton" data-action="click->speech-recognition#stop" class="${hidden}">Stop</button>
    ${withIndicator ? `<span data-speech-recognition-target="indicator" class="${hidden}">Recording...</span>` : ""}
  </div>
`
}

const startApp = async (html = buildHTML()): Promise<Application> => {
  document.body.innerHTML = html

  const application = Application.start()
  application.register("speech-recognition", SpeechRecognitionController)

  await new Promise((resolve) => setTimeout(resolve, 0))

  return application
}

describe("SpeechRecognitionController", () => {
  let app: Application

  afterEach(async () => {
    app?.stop()
    document.body.innerHTML = ""
    clearSpeechRecognition()
  })

  describe("when SpeechRecognition is not supported", () => {
    beforeEach(async () => {
      clearSpeechRecognition()
      app = await startApp()
    })

    it("hides only the speech buttons and indicator", () => {
      const el = $("[data-controller='speech-recognition']")
      const startButton = $("[data-speech-recognition-target='startButton']")
      const stopButton = $("[data-speech-recognition-target='stopButton']")
      const indicator = $("[data-speech-recognition-target='indicator']")
      const textarea = $("textarea")

      expect(el.classList.contains("d-none")).toBe(false)
      expect(startButton.classList.contains("d-none")).toBe(true)
      expect(stopButton.classList.contains("d-none")).toBe(true)
      expect(indicator.classList.contains("d-none")).toBe(true)
      expect(textarea).not.toBeNull()
    })

    it("uses default 'hidden' class when data-speech-recognition-hidden-class is not set", async () => {
      app.stop()
      document.body.innerHTML = ""
      app = await startApp(buildHTML({ hiddenClass: "" }))

      const startButton = $("[data-speech-recognition-target='startButton']")
      const stopButton = $("[data-speech-recognition-target='stopButton']")
      const indicator = $("[data-speech-recognition-target='indicator']")

      expect(startButton.classList.contains("hidden")).toBe(true)
      expect(stopButton.classList.contains("hidden")).toBe(true)
      expect(indicator.classList.contains("hidden")).toBe(true)
    })
  })

  describe("when SpeechRecognition is supported", () => {
    let recognition: ReturnType<typeof mockRecognition>

    beforeEach(async () => {
      recognition = mockRecognition()
      app = await startApp()
    })

    it("does not hide the controller element", () => {
      const el = $("[data-controller='speech-recognition']")

      expect(el.classList.contains("d-none")).toBe(false)
    })

    it("configures recognition with continuous and interimResults", () => {
      expect(recognition.continuous).toBe(true)
      expect(recognition.interimResults).toBe(true)
    })

    describe("#start", () => {
      it("calls recognition.start and toggles UI", () => {
        const startButton = $("[data-speech-recognition-target='startButton']")
        const stopButton = $("[data-speech-recognition-target='stopButton']")
        const indicator = $("[data-speech-recognition-target='indicator']")

        $btn("[data-speech-recognition-target='startButton']").click()

        expect(recognition.start).toHaveBeenCalled()
        expect(startButton.classList.contains("d-none")).toBe(true)
        expect(stopButton.classList.contains("d-none")).toBe(false)
        expect(indicator.classList.contains("d-none")).toBe(false)
      })

      it("does nothing when already listening", () => {
        const startButton = $btn("[data-speech-recognition-target='startButton']")

        startButton.click()
        recognition.start.mockClear()
        startButton.classList.remove("d-none")
        startButton.click()

        expect(recognition.start).not.toHaveBeenCalled()
      })
    })

    describe("#stop", () => {
      it("calls recognition.stop and toggles UI back", () => {
        const startButton = $btn("[data-speech-recognition-target='startButton']")
        const stopButton = $btn("[data-speech-recognition-target='stopButton']")
        const indicator = $("[data-speech-recognition-target='indicator']")

        startButton.click()
        stopButton.click()

        expect(recognition.stop).toHaveBeenCalled()
        expect(startButton.classList.contains("d-none")).toBe(false)
        expect(stopButton.classList.contains("d-none")).toBe(true)
        expect(indicator.classList.contains("d-none")).toBe(true)
      })

      it("does nothing when not listening", () => {
        $btn("[data-speech-recognition-target='stopButton']").click()

        expect(recognition.stop).not.toHaveBeenCalled()
      })
    })

    describe("onresult", () => {
      it("writes transcript to the input target", () => {
        const textarea = document.querySelector("textarea") as HTMLTextAreaElement

        $btn("[data-speech-recognition-target='startButton']").click()

        const fakeEvent = {
          results: [
            { 0: { transcript: "Hello " }, length: 1 },
            { 0: { transcript: "world" }, length: 1 },
          ],
        }

        recognition.onresult?.(fakeEvent)

        expect(textarea.value).toBe("Hello world")
      })
    })

    describe("onend", () => {
      it("resets UI when recognition ends unexpectedly", () => {
        const startButton = $btn("[data-speech-recognition-target='startButton']")
        const stopButton = $("[data-speech-recognition-target='stopButton']")
        const indicator = $("[data-speech-recognition-target='indicator']")

        startButton.click()

        expect(startButton.classList.contains("d-none")).toBe(true)

        recognition.onend?.()

        expect(startButton.classList.contains("d-none")).toBe(false)
        expect(stopButton.classList.contains("d-none")).toBe(true)
        expect(indicator.classList.contains("d-none")).toBe(true)
      })
    })

    describe("onerror", () => {
      it("resets UI on error", () => {
        $btn("[data-speech-recognition-target='startButton']").click()

        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => undefined)

        recognition.onerror?.({ error: "not-allowed" })

        const startButton = $("[data-speech-recognition-target='startButton']")

        expect(startButton.classList.contains("d-none")).toBe(false)

        consoleSpy.mockRestore()
      })
    })

    describe("disconnect", () => {
      it("aborts recognition on disconnect", async () => {
        const el = $("[data-controller='speech-recognition']")

        el.remove()

        await new Promise((resolve) => setTimeout(resolve, 50))

        expect(recognition.abort).toHaveBeenCalled()
      })
    })

    describe("without optional targets", () => {
      it("works without indicator target", async () => {
        app.stop()
        document.body.innerHTML = ""
        recognition = mockRecognition()
        app = await startApp(buildHTML({ withIndicator: false }))

        const startButton = $btn("[data-speech-recognition-target='startButton']")

        startButton.click()

        expect(startButton.classList.contains("d-none")).toBe(true)
        expect(document.querySelector("[data-speech-recognition-target='indicator']")).toBeNull()
      })
    })
  })
})
