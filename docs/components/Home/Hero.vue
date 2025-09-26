<template>
  <div class="bg-surface-primary dark:bg-surface-primary-dark relative overflow-hidden">
    <HeroLines />

    <div class="relative pt-40 pb-16 px-4">
      <div class="mx-auto max-w-4xl text-center">
        <div class="inline-flex rounded-full p-0.5 rotate-2 bg-gradient-to-tr from-tertiary to-secondary">
          <h1
            class="bg-white dark:bg-slate-800 rounded-full px-3 py-1 text-sm leading-6 text-primary dark:text-text-secondary-dark backdrop-blur-sm"
          >
            Stimulus Components
          </h1>
        </div>

        <div class="mt-8 mb-20 text-balance">
          <h2 class="text-5xl font-extrabold leading-16 text-primary dark:text-primary-dark">
            Craft world-class Stimulus controllers with your own styles
          </h2>

          <p class="text-text-secondary dark:text-text-secondary-dark font-light leading-8 mt-3">
            Over 25 Stimulus controllers with built-in behavior, top-tier documentation, designed for easy extension,
            and ready for your styles to solve every day frontend problems.
          </p>
        </div>
      </div>

      <div class="max-w-6xl mx-auto pt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="(component, index) in components"
          :key="component.title"
          :class="[
            'p-0.5 rounded-3xl bg-gradient-to-tr from-tertiary to-secondary',
            {
              'md:translate-x-1/3': index === 0,
              'md:-translate-y-1/4 z-40': index === 1,
              'md:-translate-x-1/3 z-30': index === 2,
              'z-10': index === 3,
              'md:-rotate-6': index === 0 || index === 3,
              'md:rotate-6': index === 2 || index === 4,
              'md:-translate-y-1/4 md:translate-x-1/2': index >= 3,
            },
          ]"
        >
          <div class="bg-gray-50 dark:bg-slate-800 relative rounded-3xl h-full">
            <component :is="componentsDemo[component.package]" :is-home="true" />
          </div>
        </div>
      </div>

      <div class="py-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <UIButton class="block" variant="tertiary" href="/docs">Get started</UIButton>

        <UIButton class="block" href="https://github.com/stimulus-components/stimulus-components" target="_blank">
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
import TextareaAutogrow from "@/components/content/Demo/TextareaAutogrow.vue"
import HeroLines from "@/components/Home/HeroLines.vue"

const { data: components } = await useAsyncData("components-hero", () =>
  queryContent("docs")
    .sort({ title: 1 })
    .where({
      package: {
        $in: ["character-counter", "checkbox-select-all", "clipboard", "dropdown", "password-visibility", "textarea-autogrow"],
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
  "textarea-autogrow": TextareaAutogrow,
}
</script>
