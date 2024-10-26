import { Controller } from "@hotwired/stimulus"

export default class RemoteRails extends Controller<HTMLElement> {
  replace(event: CustomEvent): void {
    event.preventDefault()
    event.stopPropagation()

    const [, , xhr] = event.detail
    this.element.outerHTML = xhr.response
  }

  append(event: CustomEvent): void {
    event.preventDefault()
    event.stopPropagation()

    const [, , xhr] = event.detail
    this.element.insertAdjacentHTML("afterend", xhr.response)
  }

  prepend(event: CustomEvent): void {
    event.preventDefault()
    event.stopPropagation()

    const [, , xhr] = event.detail

    this.element.insertAdjacentHTML("beforebegin", xhr.response)
  }
}
