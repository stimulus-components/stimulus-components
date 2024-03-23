<template>
  <div class="relative not-prose rounded-xl border border-slate-200 p-6">
    <h2 class="mb-4 font-semibold font-display text-base text-slate-900 dark:text-white">{{ title }}</h2>

    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
