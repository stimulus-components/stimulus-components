<template>
  <div>
    <p class="font-display text-sm font-medium text-orange-500 mb-2">Getting Started</p>

    <ContentRendererMarkdown :value="data" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'docs',
})

useHead({
  title: 'Installation',
  meta: [
    {
      name: 'description',
      content: 'How to install dependencies and structure your app.',
    },
  ],
})

const { data } = await useAsyncData('pages-installation', () => queryContent('pages/installation').findOne())
</script>
