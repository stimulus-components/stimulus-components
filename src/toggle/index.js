import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['item']

  connect () {
    this.hiddenClass = this.element.dataset.hiddenClass || 'hidden'
  }

  toggle () {
    this.itemTargets.forEach(item => {
      item.classList.toggle(this.hiddenClass)
    })
  }
}
