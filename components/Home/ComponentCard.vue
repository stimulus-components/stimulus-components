<template>
  <li>
    <div
      class="group relative before:absolute before:-inset-2.5 before:rounded-[20px] before:bg-gray-50 dark:before:bg-slate-500 before:opacity-0 hover:before:opacity-100"
    >
      <div
        class="dark:bg-slate-600 relative aspect-[2/1] overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-900/10"
      >
        <img
          :src="`/components/stimulus-${component.package}.png`"
          :alt="component.title"
          class="absolute inset-0 h-full p-6 object-contain mx-auto"
          loading="lazy"
        />
      </div>

      <h4 class="mt-4 text-sm font-medium text-slate-900 dark:text-gray-300 group-hover:text-orange-600">
        <NuxtLink :to="component._path">
          <span class="absolute -inset-2.5 z-10"></span>

          <span class="relative">{{ component.title }}</span>
        </NuxtLink>
      </h4>

      <p class="relative mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-300">{{ component.description }}</p>
    </div>
  </li>
</template>

<script setup>
defineProps({
  component: {
    type: Object,
    default: null,
  },
})
</script>
