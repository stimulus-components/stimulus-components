<template>
  <div class="bg-surface-primary">
    <div class="relative px-6 pt-14 lg:px-8">
      <div class="mx-auto text-center max-w-2xl py-16">
        <div class="inline-flex rounded-full p-0.5 rotate-2 bg-gradient-to-tr from-tertiary to-secondary">
          <h1 class="bg-white relative rounded-full px-3 py-1 text-sm leading-6 text-primary backdrop-blur-sm">
            Stimulus Components
          </h1>
        </div>

        <div class="text-center">
          <h2 class="mt-6 text-5xl font-extrabold leading-16 text-primary text-balance">
            Library style-free with built-in behavior
          </h2>

          <p class="text-primary">
            Stimulus Components is an open-source set of StimulusJS controllers to solve common patterns.
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto pt-8 grid grid-cols-3 gap-4">
      <div
        v-for="(component, index) in components"
        :key="component.title"
        :class="[
          'p-0.5 rounded-3xl bg-gradient-to-tr from-tertiary to-secondary',
          {
            'translate-x-1/3': index === 0,
            '-translate-y-1/4 z-40': index === 1,
            '-translate-x-1/3 z-30': index === 2,
            '-rotate-6': index === 0 || index === 3,
            'rotate-6': index === 2 || index === 4,
            '-translate-y-1/4 translate-x-1/2': index >= 3,
          },
        ]"
      >
        <div class="bg-gray-50 dark:bg-slate-600 relative rounded-3xl h-full">
          <component :is="componentsDemo[component.package]" :is-home="true" />
        </div>
      </div>
    </div>

    <div class="py-12 sm:flex sm:justify-center">
      <div>
        <UIButton variant="tertiary" href="/docs">Get started</UIButton>
      </div>

      <div class="mt-3 sm:mt-0 sm:ml-3">
        <UIButton href="https://github.com/stimulus-components/stimulus-components" target="_blank">
          <GithubIcon />

          GitHub
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import GithubIcon from "@/components/Icons/GithubIcon.vue"
import CharacterCounter from "@/components/content/Demo/CharacterCounter.vue"
import CheckboxSelectAll from "@/components/content/Demo/CheckboxSelectAll.vue"
import Clipboard from "@/components/content/Demo/Clipboard.vue"
import Dropdown from "@/components/content/Demo/Dropdown.vue"
import PasswordVisibility from "@/components/content/Demo/PasswordVisibility.vue"

const { data: components } = await useAsyncData("components-hero", () =>
  queryContent("docs")
    .sort({ title: 1 })
    .where({
      package: {
        $in: ["character-counter", "checkbox-select-all", "clipboard", "dropdown", "password-visibility"],
      },
    })
    .find(),
)

const componentsDemo = {
  "character-counter": CharacterCounter,
  "checkbox-select-all": CheckboxSelectAll,
  clipboard: Clipboard,
  dropdown: Dropdown,
  "password-visibility": PasswordVisibility,
}
</script>
