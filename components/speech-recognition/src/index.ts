import { Controller } from "@hotwired/stimulus"

export default class SpeechRecognitionController extends Controller {
  declare readonly startButtonTarget: HTMLButtonElement
  declare readonly stopButtonTarget: HTMLButtonElement
  declare readonly inputTarget: HTMLTextAreaElement | HTMLInputElement
  declare readonly indicatorTarget: HTMLElement
  declare readonly hasIndicatorTarget: boolean
  declare readonly hiddenClass: string
  declare readonly hasHiddenClass: boolean

  static targets = ["startButton", "stopButton", "indicator", "input"]
  static classes = ["hidden"]

  private recognition: SpeechRecognition | null = null
  private isListening = false
  private hiddenClassName!: string

  connect(): void {
    this.hiddenClassName = this.hasHiddenClass ? this.hiddenClass : "hidden"

    if (!this.isSupported) {
      this.startButtonTarget.classList.add(this.hiddenClassName)
      this.stopButtonTarget.classList.add(this.hiddenClassName)
      if (this.hasIndicatorTarget) this.indicatorTarget.classList.add(this.hiddenClassName)
      return
    }

    this.setupRecognition()
    this.updateUI()
  }

  disconnect(): void {
    this.recognition?.abort()
    this.recognition = null
  }

  start(): void {
    if (!this.recognition || this.isListening) return

    this.recognition.start()
    this.isListening = true
    this.updateUI()
  }

  stop(): void {
    if (!this.recognition || !this.isListening) return

    this.recognition.stop()
    this.isListening = false
    this.updateUI()
  }

  private get isSupported(): boolean {
    return "SpeechRecognition" in window || "webkitSpeechRecognition" in window
  }

  private setupRecognition(): void {
    const SpeechRecognitionAPI = window.SpeechRecognition ?? window.webkitSpeechRecognition
    this.recognition = new SpeechRecognitionAPI()
    this.recognition.continuous = true
    this.recognition.interimResults = true

    this.recognition.onresult = (event): void => {
      this.inputTarget.value = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("")
    }

    this.recognition.onend = (): void => {
      if (this.isListening) {
        this.isListening = false
        this.updateUI()
      }
    }

    this.recognition.onerror = (event): void => {
      console.error("Speech recognition error:", event.error, event.message)
      this.isListening = false
      this.updateUI()
    }
  }

  private updateUI(): void {
    this.startButtonTarget.classList.toggle(this.hiddenClassName, this.isListening)
    this.stopButtonTarget.classList.toggle(this.hiddenClassName, !this.isListening)

    if (this.hasIndicatorTarget) {
      this.indicatorTarget.classList.toggle(this.hiddenClassName, !this.isListening)
    }
  }
}
