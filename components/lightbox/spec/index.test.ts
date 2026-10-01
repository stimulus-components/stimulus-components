/**
 * @vitest-environment jsdom
 */

import { afterEach, beforeEach, describe, it, expect, vi } from "vitest"
import { Application } from "@hotwired/stimulus"
import PhotoSwipe from "photoswipe"
import Lightbox from "../src/index"

let application: Application

const startStimulus = (): void => {
  application = Application.start()
  application.register("lightbox", Lightbox)
}

// Stimulus connects controllers from a MutationObserver callback, so markup
// assigned inside a test body is not live until the microtask queue drains.
const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

const gallery = (options = ""): string => `
  <div id="gallery" data-controller="lightbox" ${options}>
    <a href="img1.jpg" data-pswp-width="1600" data-pswp-height="1067"><img src="thumb1.jpg" alt="" /></a>
    <a href="img2.jpg" data-pswp-width="1600" data-pswp-height="1067"><img src="thumb2.jpg" alt="" /></a>
  </div>
`

const controllerFor = (element: Element): Lightbox =>
  application.getControllerForElementAndIdentifier(element, "lightbox") as Lightbox

afterEach((): void => {
  application.stop()
  document.body.innerHTML = ""
})

beforeEach((): void => {
  startStimulus()
})

describe("Lightbox", (): void => {
  it("builds a PhotoSwipe lightbox bound to the controller element", async (): Promise<void> => {
    document.body.innerHTML = gallery()
    await flush()

    const element = document.getElementById("gallery")!
    const { photoSwipe } = controllerFor(element)

    expect(photoSwipe.options.gallery).toBe(element)
    expect(photoSwipe.options.children).toBe("a")
    expect(photoSwipe.options.pswpModule).toBe(PhotoSwipe)
  })

  it("merges the options value over the defaults", async (): Promise<void> => {
    document.body.innerHTML = gallery(`data-lightbox-options-value='{"children": "a.item", "loop": false}'`)
    await flush()

    const { photoSwipe } = controllerFor(document.getElementById("gallery")!)

    expect(photoSwipe.options.children).toBe("a.item")
    expect(photoSwipe.options.loop).toBe(false)
  })

  it("keeps the controller element as the gallery even when the options value sets one", async (): Promise<void> => {
    document.body.innerHTML = gallery(`data-lightbox-options-value='{"gallery": "#somewhere-else"}'`)
    await flush()

    const element = document.getElementById("gallery")!

    expect(controllerFor(element).photoSwipe.options.gallery).toBe(element)
  })

  it("destroys the lightbox on disconnect", async (): Promise<void> => {
    document.body.innerHTML = gallery()
    await flush()

    const element = document.getElementById("gallery")!
    const { photoSwipe } = controllerFor(element)
    const removeEventListener = vi.spyOn(element, "removeEventListener")

    element.remove()
    await flush()

    // destroy() drops the click listener it bound on the gallery element.
    expect(removeEventListener).toHaveBeenCalledWith("click", photoSwipe.onThumbnailsClick, false)
  })
})
