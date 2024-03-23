<template>
  <div class="mt-8 flex flex-wrap gap-x-3 gap-y-1.5 justify-center">
    <NuxtLink
      class="focus:outline-none focus-visible:outline-0 flex-shrink-0 font-medium rounded-md text-sm gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
      href="/docs"
    >
      <CubeIcon class="size-5" />

      Explore 25+ components
    </NuxtLink>
  </div>
</template>

<script setup>
import { CubeIcon } from '@heroicons/vue/24/outline'
</script>
