import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['item']

  connect () {
    this.hiddenClass = this.data.get('hiddenClass') || 'hidden'
  }

  toggle () {
    this.itemTargets.forEach(item => {
      item.classList.toggle(this.hiddenClass)
    })
  }

  show () {
    this.itemTargets.forEach(item => {
      item.classList.remove(this.hiddenClass)
    })
  }

  hide () {
    this.itemTargets.forEach(item => {
      item.classList.add(this.hiddenClass)
    })
  }
}
