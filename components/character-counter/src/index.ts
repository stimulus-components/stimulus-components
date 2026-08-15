import { Controller } from "@hotwired/stimulus"

const COUNT_UNITS = ["code-units", "code-points", "graphemes"] as const

type CountUnit = (typeof COUNT_UNITS)[number]

// Intl.Segmenter is not part of the `es6` lib this repo compiles against, so declare the bits we use.
interface GraphemeSegmenter {
  segment(input: string): Iterable<unknown>
}

type SegmenterConstructor = new (
  locales?: string | string[],
  options?: { granularity: "grapheme" },
) => GraphemeSegmenter

export default class CharacterCounter extends Controller {
  declare readonly counterTarget: HTMLElement
  declare readonly inputTarget: HTMLInputElement
  declare readonly hasCountdownValue: boolean
  declare readonly countUnitValue: CountUnit
  declare segmenter?: GraphemeSegmenter

  static targets = ["input", "counter"]
  static values = {
    countdown: Boolean,
    countUnit: { type: String, default: "code-units" },
  }

  initialize(): void {
    this.update = this.update.bind(this)
  }

  connect(): void {
    if (COUNT_UNITS.indexOf(this.countUnitValue) === -1) {
      console.error(
        `[stimulus-character-counter] Unknown count unit: ${this.countUnitValue}. Valid units are: ${COUNT_UNITS.join(", ")}. Falling back to code-units.`,
      )
    }

    if (this.countUnitValue === "graphemes") {
      const Segmenter = (Intl as unknown as { Segmenter?: SegmenterConstructor }).Segmenter

      if (Segmenter) {
        this.segmenter = new Segmenter(undefined, { granularity: "grapheme" })
      } else {
        console.error(
          "[stimulus-character-counter] Intl.Segmenter is not supported by this browser. Falling back to code-points.",
        )
      }
    }

    this.update()
    this.inputTarget.addEventListener("input", this.update)
  }

  disconnect(): void {
    this.inputTarget.removeEventListener("input", this.update)
    this.segmenter = undefined
  }

  update(): void {
    this.counterTarget.innerHTML = this.count.toLocaleString()
  }

  get count(): number {
    let value: number = this.inputLength

    if (this.hasCountdownValue) {
      if (this.maxLength < 0) {
        console.error(
          `[stimulus-character-counter] You need to add a maxlength attribute on the input to use countdown mode. The current value is: ${this.maxLength}.`,
        )
      }

      value = Math.max(this.maxLength - value, 0)
    }

    return value
  }

  get inputLength(): number {
    const value = this.inputTarget.value

    switch (this.countUnitValue) {
      case "graphemes":
        return this.segmenter ? [...this.segmenter.segment(value)].length : [...value].length
      case "code-points":
        return [...value].length
      default:
        return value.length
    }
  }

  get maxLength(): number {
    return this.inputTarget.maxLength
  }
}
