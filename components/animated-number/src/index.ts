import { Controller } from "@hotwired/stimulus"

export default class AnimatedNumber extends Controller<HTMLElement> {
  declare lazyThresholdValue: number
  declare lazyRootMarginValue: string
  declare startValue: number
  declare endValue: number
  declare durationValue: number
  declare lazyValue: number

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
  }

  connect(): void {
    if (this.lazyValue) {
      this.lazyAnimate()
    } else {
      this.animate()
    }
  }

  animate(): void {
    let startTimestamp: number | null = null

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp

      const elapsed: number = timestamp - startTimestamp
      const progress: number = Math.min(elapsed / this.durationValue, 1)

      this.element.innerHTML = Math.floor(progress * (this.endValue - this.startValue) + this.startValue).toString()

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
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

  get lazyAnimateOptions(): IntersectionObserverInit {
    return {
      threshold: this.lazyThresholdValue,
      rootMargin: this.lazyRootMarginValue,
    }
  }
}
