<template>
  <div class="py-16 mx-auto max-w-6xl px-6">
    <h2 class="text-text-secondary text-2xl text-center">Import your design</h2>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 mt-12">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        type="button"
        tabindex="-1"
        class="flex flex-col gap-2"
        @click.prevent="selectedIndex = index"
      >
        <span class="flex items-center gap-2 px-5">
          <component :is="tab.icon" class="size-8" :class="tab.iconClass" />

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
      <UIButton href="/docs" variant="tertiary">Explore 25+ components</UIButton>
    </div>
  </div>
</template>

<script setup>
import PlaygroundSimple from "@/components/Home/Playground/PlaygroundSimple.vue"
import PlaygroundBrutalist from "@/components/Home/Playground/PlaygroundBrutalist.vue"
import PlaygroundPlayful from "@/components/Home/Playground/PlaygroundPlayful.vue"
import { Square2StackIcon, SwatchIcon, CubeIcon } from "@heroicons/vue/24/outline"

const selectedIndex = ref(1)
const tabs = [
  {
    label: "Simple",
    component: PlaygroundSimple,
    icon: Square2StackIcon,
    iconClass: "text-gray-400",
  },
  {
    label: "Brutalist",
    component: PlaygroundBrutalist,
    icon: CubeIcon,
    iconClass: "text-teal-400",
  },
  {
    label: "Playful",
    component: PlaygroundPlayful,
    icon: SwatchIcon,
    iconClass: "text-pink-400",
  },
]

const selectedTab = computed(() => tabs.find((_, index) => index === selectedIndex.value))
</script>
