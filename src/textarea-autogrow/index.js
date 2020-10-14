import { Controller } from 'stimulus'
import { debounce } from '../utils'

export default class extends Controller {
  connect () {
    this.element.style.overflow = 'hidden'
    const delay = this.data.get('resizeDebounceDelay') || 100

    this.autogrow = this.autogrow.bind(this)
    this.onResize = delay > 0 ? debounce(this.autogrow, delay) : this.autogrow

    this.autogrow()

    this.element.addEventListener('input', this.autogrow)
    window.addEventListener('resize', this.onResize)
  }

  disconnect () {
    window.removeEventListener('resize', this.onResize)
  }

  autogrow () {
    this.element.style.height = 'auto' // Force re-print before calculating the scrollHeight value.
    this.element.style.height = `${this.element.scrollHeight}px`
  }
}
