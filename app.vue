<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const title = 'Stimulus Components'
const description = 'Simple and powerful Stimulus JS library for common JavaScript behavior.'

useHead({
  title,
  titleTemplate: '%s | Stimulus Components',
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    { rel: 'preconnect', href: 'https://e9in2dium3-dsn.algolia.net' },
    { rel: 'preconnect', href: 'https://img.shields.io' },
    { rel: 'preconnect', href: 'https://github.com' },
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      name: 'description',
      content: description,
    },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'author', content: 'guillaumebriday' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    {
      property: 'og:image',
      content: 'https://raw.githubusercontent.com/stimulus-components/stimulus-components/master/screenshot.png',
    },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@guillaumebriday' },
  ],
})
</script>
