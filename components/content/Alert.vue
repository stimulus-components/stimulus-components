<template>
  <div class="rounded-md bg-blue-50 p-4 not-prose">
    <div class="flex">
      <div class="flex-shrink-0">
        <InformationCircleIcon class="size-5 text-blue-400" />
      </div>

      <div class="ml-3 flex-1">
        <p class="text-sm text-blue-700">
          <slot />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/solid'
</script>
