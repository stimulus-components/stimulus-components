<template>
  <div>
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

const { data } = await useAsyncData('installation', () => queryContent('pages/installation').findOne())
</script>
