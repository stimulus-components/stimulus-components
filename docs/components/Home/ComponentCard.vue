<template>
  <li>
    <div
      class="relative h-full flex flex-col justify-end bg-white dark:bg-surface-primary-dark p-5 rounded-2xl drop-shadow-xl"
    >
      <img
        :src="`/components/stimulus-${component.package}.svg`"
        :alt="component.title"
        class="mb-3 size-8"
        loading="lazy"
      />

      <h4 class="text-lg font-bold text-primary dark:text-primary-dark group-hover:text-orange-600">
        <NuxtLink :to="component._path">
          <span class="absolute -inset-2.5 z-10"></span>

          <span class="relative">{{ component.title }}</span>
        </NuxtLink>
      </h4>

      <p class="grow relative my-2 text-xs font-medium text-text-secondary dark:text-text-secondary-dark">
        {{ component.description }}
      </p>

      <div
        class="dark:bg-slate-800 relative aspect-[2/1] overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-900/10"
      >
        <img
          :src="`/components/stimulus-${component.package}.png`"
          :alt="component.title"
          class="absolute inset-0 h-full p-6 object-contain mx-auto"
          loading="lazy"
        />
      </div>
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
