import { Application } from "@hotwired/stimulus"
import CheckboxSelectAll from "@stimulus-components/checkbox-select-all/src"
import Clipboard from "@stimulus-components/clipboard/src"
import CharacterCounter from "@stimulus-components/character-counter/src"
import Dropdown from "@stimulus-components/dropdown/src"

// @ts-expect-error
// eslint-disable-next-line no-undef
export default defineNuxtPlugin(() => {
  const application = Application.start()

  application.register("checkbox-select-all", CheckboxSelectAll)
  application.register("clipboard", Clipboard)
  application.register("character-counter", CharacterCounter)
  application.register("dropdown", Dropdown)
})
