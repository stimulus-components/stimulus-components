<template>
  <button
    aria-label="Toggle dark mode"
    class="font-medium rounded-md text-sm p-2 text-gray-500 dark:text-white dark:hover:text-gray-300 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    @click.prevent="isDark = !isDark"
  >
    <!-- The active colour mode is only known in the browser, so rendering the
         icon on the server guarantees a hydration mismatch — and Vue does not
         repair those in production, leaving the wrong icon on screen. -->
    <ClientOnly>
      <component :is="isDark ? SunIcon : MoonIcon" class="size-5" />

      <template #fallback>
        <span class="block size-5" />
      </template>
    </ClientOnly>
  </button>
</template>

<script setup>
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline"

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === "dark"
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
  },
})
</script>
