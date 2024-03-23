<template>
  <button
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
    class="font-medium rounded-md text-sm p-2 text-gray-500 dark:text-white dark:hover:text-gray-300 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    @click.prevent="isDark = !isDark"
  >
    <component :is="isDark ? SunIcon : MoonIcon" class="size-5" />
  </button>
</template>

<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>
