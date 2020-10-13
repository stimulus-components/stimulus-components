import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['checkbox']

  toggle (e) {
    e.preventDefault()

    this.checkboxTargets.forEach(checkbox => {
      checkbox.checked = e.target.checked
    })
  }
}
