import { Application } from "@hotwired/stimulus"
import Rails from "@rails/ujs"

import AnimatedNumber from "@stimulus-components/animated-number/src"
import Carousel from "@stimulus-components/carousel/src"
import CharacterCounter from "@stimulus-components/character-counter/src"
import Chart from "@stimulus-components/chartjs/src"
import CheckboxSelectAll from "@stimulus-components/checkbox-select-all/src"
import Clipboard from "@stimulus-components/clipboard/src"
import ColorPicker from "@stimulus-components/color-picker/src"
import Confirmation from "@stimulus-components/confirmation/src"
import ContentLoader from "@stimulus-components/content-loader/src"
import Dialog from "@stimulus-components/dialog/src"
import Dropdown from "@stimulus-components/dropdown/src"
import Glow from "stimulus-glow/src"
import Lightbox from "@stimulus-components/lightbox/src"
import Notification from "@stimulus-components/notification/src"
import PasswordVisibility from "@stimulus-components/password-visibility/src"
import Popover from "@stimulus-components/popover/src"
import RadioUncheck from "@stimulus-components/radio-uncheck/src"
import RailsNestedForm from "@stimulus-components/rails-nested-form/src"
import ReadMore from "@stimulus-components/read-more/src"
import RemoteRails from "@stimulus-components/remote-rails/src"
import Reveal from "@stimulus-components/reveal/src"
import ScrollProgress from "@stimulus-components/scroll-progress/src"
import ScrollReveal from "@stimulus-components/scroll-reveal/src"
import Sortable from "@stimulus-components/sortable/src"
import Sound from "@stimulus-components/sound/src"
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
  application.register("confirmation", Confirmation)
  application.register("content-loader", ContentLoader)
  application.register("dialog", Dialog)
  application.register("dropdown", Dropdown)
  application.register("glow", Glow)
  application.register("lightbox", Lightbox)
  application.register("nested-form", RailsNestedForm)
  application.register("notification", Notification)
  application.register("password-visibility", PasswordVisibility)
  application.register("popover", Popover)
  application.register("radio-uncheck", RadioUncheck)
  application.register("read-more", ReadMore)
  application.register("remote", RemoteRails)
  application.register("reveal", Reveal)
  application.register("scroll-progress", ScrollProgress)
  application.register("scroll-reveal", ScrollReveal)
  application.register("sortable", Sortable)
  application.register("sound", Sound)
  application.register("timeago", Timeago)

  // @ts-expect-error
  if (!window._rails_loaded) {
    Rails.start()
  }
})
