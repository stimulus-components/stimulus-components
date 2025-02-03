<template>
  <div
    :class="[
      'not-prose rounded-xl p-6',
      {
        relative: title !== 'Glow',
        'border border-slate-200': !isHome,
      },
    ]"
  >
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
  isHome: {
    type: Boolean,
    default: false,
  },
})
</script>
