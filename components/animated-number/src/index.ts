import { Controller } from "@hotwired/stimulus"

export default class AnimatedNumber extends Controller<HTMLElement> {
  declare lazyThresholdValue: number
  declare lazyRootMarginValue: string
  declare startValue: number
  declare endValue: number
  declare durationValue: number
  declare lazyValue: number
  declare decimalPlacesValue: number
  declare decimalSeparatorValue: string
  declare thousandsSeparatorValue: string

  static values = {
    start: Number,
    end: Number,
    duration: Number,
    lazyThreshold: Number,
    lazyRootMargin: {
      type: String,
      default: "0px",
    },
    lazy: Boolean,
    decimalPlaces: {
      type: Number,
      default: 0,
    },
    decimalSeparator: {
      type: String,
      default: ".",
    },
    thousandsSeparator: {
      type: String,
      default: ",",
    },
  }

  connect(): void {
    this.lazyValue ? this.lazyAnimate() : this.animate()
  }

  animate(): void {
    let startTimestamp: number = null

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp

      const elapsed: number = timestamp - startTimestamp
      const progress: number = Math.min(elapsed / this.durationValue, 1)
      const currentValue = progress * (this.endValue - this.startValue) + this.startValue

      this.element.innerHTML = this.formatNumber(currentValue)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  formatNumber(value: number): string {
    const rounded = value.toFixed(this.decimalPlacesValue)
    const [integerPartRaw, decimalPart = ""] = rounded.split(".")
    const integerPart = integerPartRaw.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparatorValue)
    return decimalPart ? `${integerPart}${this.decimalSeparatorValue}${decimalPart}` : integerPart
  }

  lazyAnimate(): void {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          this.animate()

          observer.unobserve(entry.target)
        }
      })
    }, this.lazyAnimateOptions)

    observer.observe(this.element)
  }

  // eslint-disable-next-line
  get lazyAnimateOptions(): IntersectionObserverInit {
    return {
      threshold: this.lazyThresholdValue,
      rootMargin: this.lazyRootMarginValue,
    }
  }
}
