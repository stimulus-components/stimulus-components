import { Controller } from "@hotwired/stimulus"
import lightGallery from "lightgallery"
import { LightGallerySettings } from "lightgallery/lg-settings"
import { LightGallery } from "lightgallery/lightgallery"

export default class Lightbox extends Controller<HTMLElement> {
  optionsValue: LightGallerySettings
  lightGallery: LightGallery

  static values = {
    options: Object,
  }

  connect(): void {
    this.lightGallery = lightGallery(this.element, {
      ...this.defaultOptions,
      ...this.optionsValue,
    })
  }

  disconnect(): void {
    this.lightGallery.destroy()
  }

  get defaultOptions(): LightGallerySettings {
    return {}
  }
}
