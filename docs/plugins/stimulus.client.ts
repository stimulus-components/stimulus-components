import { Application } from "@hotwired/stimulus"
import AnimatedNumber from "@stimulus-components/animated-number/src"
import CharacterCounter from "@stimulus-components/character-counter/src"
import CheckboxSelectAll from "@stimulus-components/checkbox-select-all/src"
import Clipboard from "@stimulus-components/clipboard/src"
import Dropdown from "@stimulus-components/dropdown/src"
import Timeago from "@stimulus-components/timeago/src"
import ColorPicker from "@stimulus-components/color-picker/src"
import Dialog from "@stimulus-components/dialog/src"
import ReadMore from "@stimulus-components/read-more/src"
import PasswordVisibility from "@stimulus-components/password-visibility/src"
import Chart from "@stimulus-components/chartjs/src"

// @ts-expect-error
// eslint-disable-next-line no-undef
export default defineNuxtPlugin(() => {
  const application = Application.start()

  application.register("animated-number", AnimatedNumber)
  application.register("character-counter", CharacterCounter)
  application.register("checkbox-select-all", CheckboxSelectAll)
  application.register("clipboard", Clipboard)
  application.register("dropdown", Dropdown)
  application.register("timeago", Timeago)
  application.register("dialog", Dialog)
  application.register("read-more", ReadMore)
  application.register("password-visibility", PasswordVisibility)
  application.register("color-picker", ColorPicker)
  application.register("chart", Chart)
})
