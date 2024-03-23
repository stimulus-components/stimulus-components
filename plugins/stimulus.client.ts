import { Application } from '@hotwired/stimulus'
import CheckboxSelectAll from '@stimulus-components/checkbox-select-all'
import Clipboard from '@stimulus-components/clipboard'
import CharacterCounter from '@stimulus-components/character-counter'
import Dropdown from '@stimulus-components/dropdown'

export default defineNuxtPlugin(() => {
  const application = Application.start()
  application.register('checkbox-select-all', CheckboxSelectAll)
  application.register('clipboard', Clipboard)
  application.register('character-counter', CharacterCounter)
  application.register('dropdown', Dropdown)
})
