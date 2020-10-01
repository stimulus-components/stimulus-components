import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['target', 'template']

  add (e) {
    e.preventDefault()

    const content = this.templateTarget.innerHTML.replace(/NEW_RECORD/g, new Date().getTime())
    this.targetTarget.insertAdjacentHTML('beforebegin', content)
  }
}
