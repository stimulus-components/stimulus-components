<template>
  <div>
    <DocsBadges v-if="data" :package-name="data.package" />

    <p>
      This component is available on
      <a :href="githubUrl" target="_blank">GitHub</a>.
    </p>

    <h1>Stimulus {{ data.title }}</h1>
    <p>{{ data.description }}</p>

    <ContentRendererMarkdown :value="data" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const { data } = await useAsyncData('component', () => queryContent(`docs/${route.params.slug}`).findOne())

const githubUrl = computed(() => `https://github.com/stimulus-components/stimulus-${data.value.package}`)

useHead({
  title: `Stimulus ${data.value.title}`,
  meta: [
    {
      name: 'description',
      content: data.value.description,
    },
  ],
})
</script>
