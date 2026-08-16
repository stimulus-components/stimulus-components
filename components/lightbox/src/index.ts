import { Controller } from "@hotwired/stimulus"
import PhotoSwipe from "photoswipe"
import type { PhotoSwipeOptions } from "photoswipe"
import PhotoSwipeLightbox from "photoswipe/lightbox"

export default class Lightbox extends Controller<HTMLElement> {
  declare optionsValue: PhotoSwipeOptions
  declare photoSwipe: PhotoSwipeLightbox

  static values = {
    options: Object,
  }

  connect(): void {
    this.photoSwipe = new PhotoSwipeLightbox({
      children: "a",
      pswpModule: PhotoSwipe,
      ...this.defaultOptions,
      ...this.optionsValue,
      gallery: this.element,
    })

    this.photoSwipe.init()
  }

  disconnect(): void {
    this.photoSwipe.destroy()
  }

  get defaultOptions(): PhotoSwipeOptions {
    return {}
  }
}
