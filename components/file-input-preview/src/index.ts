import { Controller } from "@hotwired/stimulus"

export default class FileInputPreview extends Controller<HTMLFormElement> {
  declare inputTarget: HTMLInputElement
  declare previewTemplateTarget: HTMLTemplateElement
  declare destinationTarget: HTMLElement

  static targets = ["input", "previewTemplate", "destination"]

  connect(): void {
    this.inputTarget.addEventListener("change", () => {
      this.destinationTarget.replaceChildren()

      if (this.inputTarget.files && this.inputTarget.files.length > 0) {
        Array.from(this.inputTarget.files).forEach((file, index) => {
          this.destinationTarget.appendChild(this.newImageNode(file, index, this.inputTarget.files.length))
        })
      }
    })
  }

  newImageNode(file: File, index: number, total: number): DocumentFragment {
    const fragment = this.previewTemplateTarget.content.cloneNode(true) as DocumentFragment
    const img = fragment.querySelector("img")
    if (img) {
      img.src = URL.createObjectURL(file)
      img.style.setProperty("--image-index", `${index}`)
      img.style.setProperty("--images-count", `${total}`)
    }
    return fragment
  }
}
