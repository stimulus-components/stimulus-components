import { Application } from "@hotwired/stimulus"
import AnimatedNumber from "@stimulus-components/animated-number/src"
import Carousel from "@stimulus-components/carousel/src"
import CharacterCounter from "@stimulus-components/character-counter/src"
import Chart from "@stimulus-components/chartjs/src"
import CheckboxSelectAll from "@stimulus-components/checkbox-select-all/src"
import Clipboard from "@stimulus-components/clipboard/src"
import ColorPicker from "@stimulus-components/color-picker/src"
import Dialog from "@stimulus-components/dialog/src"
import Dropdown from "@stimulus-components/dropdown/src"
import PasswordVisibility from "@stimulus-components/password-visibility/src"
import ReadMore from "@stimulus-components/read-more/src"
import ScrollProgress from "@stimulus-components/scroll-progress/src"
import ScrollReveal from "@stimulus-components/scroll-reveal/src"
import Timeago from "@stimulus-components/timeago/src"

// @ts-expect-error
// eslint-disable-next-line no-undef
export default defineNuxtPlugin(() => {
  const application = Application.start()

  application.register("animated-number", AnimatedNumber)
  application.register("carousel", Carousel)
  application.register("character-counter", CharacterCounter)
  application.register("chart", Chart)
  application.register("checkbox-select-all", CheckboxSelectAll)
  application.register("clipboard", Clipboard)
  application.register("color-picker", ColorPicker)
  application.register("dialog", Dialog)
  application.register("dropdown", Dropdown)
  application.register("password-visibility", PasswordVisibility)
  application.register("read-more", ReadMore)
  application.register("scroll-progress", ScrollProgress)
  application.register("scroll-reveal", ScrollReveal)
  application.register("timeago", Timeago)
})
