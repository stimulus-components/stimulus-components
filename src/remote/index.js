import { Controller } from 'stimulus'

export default class extends Controller {
  replace (event) {
    event.preventDefault()

    const [, , xhr] = event.detail
    this.element.innerHTML = xhr.response
  }
}
