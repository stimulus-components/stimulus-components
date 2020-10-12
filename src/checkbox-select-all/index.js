import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['checkbox']

  toggleAll (e) {
    e.preventDefault()

    this.checkboxTargets.forEach(checkbox => {
      checkbox.checked = e.target.checked
    })
  }
}
