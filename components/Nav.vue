<template>
  <nav class="shadow sticky top-0 z-50 bg-white dark:bg-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" :class="{ shadow: isMobileNavOpen }">
      <div class="flex justify-between h-16">
        <div class="flex w-full gap-2 md:gap-8 items-center">
          <div class="flex items-center md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click.prevent="toggleOpened"
            >
              <span class="sr-only">Open main menu</span>

              <Bars3Icon class="size-6" :class="{ hidden: isMobileNavOpen }" />
              <XMarkIcon class="size-6" :class="{ hidden: !isMobileNavOpen }" />
            </button>
          </div>

          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="flex flex-col font-bold dark:text-white">
              <span>Stimulus</span>
              <span class="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
                >Components</span
              >
            </NuxtLink>
          </div>

          <div class="hidden md:flex gap-4 h-full">
            <NuxtLink
              v-for="link in links"
              :key="link.url"
              :to="link.url"
              class="text-gray-500 dark:text-white dark:hover:text-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              active-class="border-b-2 border-orange-500 text-gray-900"
            >
              {{ link.title }}
            </NuxtLink>
          </div>

          <div class="flex gap-2 md:gap-4 items-center ml-auto">
            <AlgoliaDocSearch class="my-auto" />

            <ColorModeButton />

            <GithubStarsCounter />
          </div>
        </div>
      </div>
    </div>

    <div
      id="mobile-menu"
      class="overflow-y-scroll h-[calc(100vh-4rem)] md:hidden"
      :class="{ hidden: !isMobileNavOpen }"
    >
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          class="text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block px-3 py-2 text-base font-medium sm:px-5"
          active-class="bg-orange-50 border-l-4 border-orange-500 text-orange-700"
        >
          {{ link.title }}
        </NuxtLink>
      </div>

      <div class="px-4 pb-3 sm:px-5">
        <DocsSidebar />
      </div>
    </div>
  </nav>
</template>

<script setup>
import GithubStarsCounter from '@/components/GithubStarsCounter.vue'
import ColorModeButton from '@/components/UI/ColorModeButton.vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const isMobileNavOpen = ref(false)
const links = [
  { title: 'Docs', url: '/docs/' },
  { title: 'Sponsors', url: '/sponsors/' },
]

const toggleOpened = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value
}

useHead({
  bodyAttrs: {
    class: { 'overflow-hidden': isMobileNavOpen },
  },
})

watch(
  () => route.fullPath,
  () => {
    isMobileNavOpen.value = false
  },
)
</script>
