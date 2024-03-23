<template>
  <NuxtLink :to="path" class="group relative rounded-xl border border-slate-200">
    <div
      class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.orange.50)),var(--quick-links-hover-bg,theme(colors.orange.50)))_padding-box,linear-gradient(to_top,theme(colors.yellow.400),theme(colors.yellow.400),theme(colors.orange.500))_border-box] group-hover:opacity-100 dark:group-hover:opacity-30"
    ></div>

    <div class="relative overflow-hidden rounded-xl p-6">
      <component :is="icon" class="size-8" />

      <h2 class="mt-4 font-display text-base text-slate-900 dark:text-white">
        {{ title }}
      </h2>

      <p class="mt-1 text-sm text-slate-700 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  icon: {
    type: Function,
    required: true,
  },
})
</script>
