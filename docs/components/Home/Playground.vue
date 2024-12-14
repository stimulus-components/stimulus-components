<template>
  <div class="pb-16 mx-auto max-w-6xl px-4">
    <h2 class="text-text-secondary dark:text-text-secondary-dark text-3xl text-center">Import your design</h2>

    <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-16 mt-8">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        type="button"
        tabindex="-1"
        class="flex flex-col gap-2"
        @click.prevent="selectedIndex = index"
      >
        <span class="flex items-center gap-2 px-5 text-text-secondary dark:text-text-secondary-dark">
          <component :is="tab.icon" :class="tab.iconClass" />

          {{ tab.label }}
        </span>

        <span
          :class="[
            'h-0.5 from-tertiary to-secondary',
            {
              'bg-transparent': index !== selectedIndex,
              'bg-gradient-to-tr': index === selectedIndex,
            },
          ]"
        ></span>
      </button>
    </div>

    <div class="mt-16">
      <component :is="selectedTab?.component" />
    </div>

    <div class="mt-12 flex justify-center">
      <UIButton href="/docs" variant="tertiary">Getting started</UIButton>
    </div>
  </div>
</template>

<script setup>
import PlaygroundSimple from "@/components/Home/Playground/PlaygroundSimple.vue"
import PlaygroundBrutalist from "@/components/Home/Playground/PlaygroundBrutalist.vue"
import PlaygroundPlayful from "@/components/Home/Playground/PlaygroundPlayful.vue"
import BrutalistIcon from "@/components/Icons/BrutalistIcon.vue"
import PlayfulIcon from "@/components/Icons/PlayfulIcon.vue"
import SimpleIcon from "@/components/Icons/SimpleIcon.vue"

const selectedIndex = ref(0)
const tabs = [
  {
    label: "Simple",
    component: PlaygroundSimple,
    icon: SimpleIcon,
    iconClass: "text-gray-400",
  },
  {
    label: "Brutalist",
    component: PlaygroundBrutalist,
    icon: BrutalistIcon,
    iconClass: "text-teal-400",
  },
  {
    label: "Playful",
    component: PlaygroundPlayful,
    icon: PlayfulIcon,
    iconClass: "text-pink-400",
  },
]

const selectedTab = computed(() => tabs.find((_, index) => index === selectedIndex.value))
</script>
