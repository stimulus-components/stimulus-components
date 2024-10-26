import { Controller } from "@hotwired/stimulus"
import SwiperOptions from "swiper"
// @ts-expect-error
import Swiper from "swiper/bundle"

export default class Carousel extends Controller {
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
    this.swiper = undefined
  }

  get defaultOptions(): SwiperOptions {
    // @ts-expect-error
    return {}
  }
}
