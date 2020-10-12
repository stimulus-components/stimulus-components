import { Controller } from 'stimulus'

export default class extends Controller {
  replace (event) {
    event.preventDefault()

    const [,, xhr] = e.detail
    this.element.innerHTML = xhr.response
  }
}
