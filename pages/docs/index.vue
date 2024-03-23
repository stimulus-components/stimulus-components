<template>
  <div>
    <p class="font-display text-sm font-medium text-orange-500 mb-2">Getting Started</p>

    <h1>Introduction</h1>

    <p>
      You will find in this section the documentation for every single controller of the
      <a href="https://github.com/stimulus-components" target="_blank">Stimulus Components</a>
      library.
    </p>

    <div class="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Card
        v-for="link in links"
        :key="link.title"
        :title="link.title"
        :description="link.description"
        :path="link.path"
        :icon="link.icon"
      />
    </div>

    <h2>Concept</h2>

    <p>
      Stimulus Components is not a library you can install directly. It is a set of
      <strong>multiple independent controllers</strong> that you can install according to your need. It is
      <strong>completely UI agnostic</strong>. You can use any CSS framework even your own one.
    </p>

    <p>
      Most of the components are extracted from real world applications. They are written as if you wrote them in your
      apps. But thanks to Stimulus Components, you don't have to write and maintain them. Just enjoy them out of the
      box, and battle tested by hundreds of other developers.
    </p>
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue'
import { BeakerIcon, CubeTransparentIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'docs',
})

useHead({
  title: 'Introduction',
  meta: [
    {
      name: 'description',
      content:
        'You will find in this section the documentation for every single controller of the Stimulus Components library.',
    },
  ],
})

const links = [
  {
    title: 'Installation',
    path: '/docs/installation/',
    icon: BeakerIcon,
    description: 'Step-by-step guides to setting up your system and installing the library.',
  },
  {
    title: 'Sponsors',
    path: '/sponsors/',
    icon: CubeTransparentIcon,
    description: 'Step-by-step guides to setting up your system and installing the library',
  },
]
</script>
