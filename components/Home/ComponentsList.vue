<template>
  <div class="py-24 sm:py-32 mx-auto max-w-6xl">
    <div class="mx-auto px-6 lg:px-8">
      <div class="mx-auto max-w-xl text-center">
        <h2 class="text-lg font-semibold leading-8 tracking-tight text-orange-600">Components</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Browse all our components available!
        </p>
      </div>
    </div>

    <ul
      class="mt-16 grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ComponentCard v-for="component in components" :key="component.title" :component="component" />
    </ul>

    <ComponentsMoreButton />
  </div>
</template>

<script setup>
import ComponentCard from '@/components/Home/ComponentCard.vue'
import ComponentsMoreButton from '@/components/Home/ComponentsMoreButton.vue'

const { data: components } = await useAsyncData('components-list', () =>
  queryContent('docs')
    .sort({ title: 1 })
    .where({
      package: {
        $in: [
          'character-counter',
          'chartjs',
          'checkbox-select-all',
          'clipboard',
          'dropdown',
          'password-visibility',
          'auto-submit',
          'rails-nested-form',
        ],
      },
    })
    .find(),
)
</script>
