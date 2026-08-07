/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import Notification from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("notification", Notification)
}

// Short real delays rather than fake timers: hide() awaits stimulus-use's
// leave() transition, so the timeout and the transition promise have to
// interleave the way they do at runtime.
const DELAY = 20

// stimulus-use's leave() resolves off requestAnimationFrame, which takes ~200ms
// here on an idle machine and considerably longer when the whole suite runs in
// parallel. These waits are generous on purpose so the specs are not load-flaky.
const TRANSITION = { timeout: 8000, interval: 20 }
const TEST_TIMEOUT = 15000

afterEach((): void => {
  application.stop()
})

beforeEach((): void => {
  startStimulus()
})

const notification = (): HTMLElement => document.querySelector("#notification")

describe("when visible by default", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div id="notification" data-controller="notification" data-notification-delay-value="${DELAY}" class="hidden">
        <p>This alert will magically disappear!</p>
      </div>
    `
  })

  it("reveals the notification on connect", (): void => {
    expect(notification().classList.contains("hidden")).toBe(false)
  })

  it(
    "removes itself once the delay elapses",
    async (): Promise<void> => {
      expect(notification()).not.toBeNull()

      await vi.waitFor((): void => {
        expect(notification()).toBeNull()
      }, TRANSITION)
    },
    TEST_TIMEOUT,
  )
})

describe("when hidden by default", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div
        id="notification"
        data-controller="notification"
        data-notification-hidden-value="true"
        data-notification-delay-value="${DELAY}"
        class="hidden"
      >
        <p>Triggered programmatically.</p>
      </div>
    `
  })

  it("stays hidden on connect", (): void => {
    expect(notification().classList.contains("hidden")).toBe(true)
  })

  it("does not remove itself", async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, DELAY * 4))

    expect(notification()).not.toBeNull()
  })
})

describe("#show", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div
        id="notification"
        data-controller="notification"
        data-notification-hidden-value="true"
        data-notification-delay-value="${DELAY}"
        data-action="awesome@window->notification#show"
        class="hidden"
      >
        <p>Triggered programmatically.</p>
      </div>
    `
  })

  it(
    "reveals then removes the notification when the event fires",
    async (): Promise<void> => {
      expect(notification().classList.contains("hidden")).toBe(true)

      window.dispatchEvent(new CustomEvent("awesome"))

      expect(notification().classList.contains("hidden")).toBe(false)

      await vi.waitFor((): void => {
        expect(notification()).toBeNull()
      }, TRANSITION)
    },
    TEST_TIMEOUT,
  )
})

describe("#hide", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <div id="notification" data-controller="notification" data-notification-hidden-value="true" class="hidden">
        <button id="close" type="button" data-action="notification#hide">Close</button>
      </div>
    `
  })

  it(
    "removes the notification when dismissed",
    async (): Promise<void> => {
      document.querySelector<HTMLButtonElement>("#close").click()

      await vi.waitFor((): void => {
        expect(notification()).toBeNull()
      }, TRANSITION)
    },
    TEST_TIMEOUT,
  )
})
