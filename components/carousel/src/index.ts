import { Controller } from "@hotwired/stimulus"
import type { SwiperOptions } from "swiper/types"
import Swiper from "swiper/bundle"

export default class Carousel extends Controller<HTMLElement> {
  declare swiper: Swiper
  declare optionsValue: SwiperOptions

  static values = {
    options: Object,
  }

  connect(): void {
    this.swiper = new Swiper(this.element, {
      ...this.defaultOptions,
      ...this.optionsValue,
    })
  }

  disconnect(): void {
    this.swiper.destroy()
  }

  get defaultOptions(): SwiperOptions {
    return {}
  }
}
