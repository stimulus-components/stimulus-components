<template>
  <ul class="flex flex-wrap gap-2 not-prose list-none px-0 mb-8">
    <li v-for="badge in badges" :key="badge.img">
      <a :href="badge.url" target="_blank">
        <img loading="lazy" :src="badge.img" alt="" />
      </a>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  packageName: {
    type: String,
    required: true,
  },
})

const badges = [
  {
    url: `https://www.npmjs.com/package/stimulus-${props.packageName}`,
    img: `https://img.shields.io/npm/dt/stimulus-${props.packageName}.svg`,
  },
  {
    url: `https://www.npmjs.com/package/stimulus-${props.packageName}`,
    img: `https://img.shields.io/bundlephobia/minzip/stimulus-${props.packageName}.svg`,
  },
  {
    url: `https://www.npmjs.com/package/stimulus-${props.packageName}`,
    img: `https://img.shields.io/npm/v/stimulus-${props.packageName}.svg`,
  },
  {
    url: `https://www.npmjs.com/package/stimulus-${props.packageName}`,
    img: `https://github.com/stimulus-components/stimulus-${props.packageName}/workflows/Lint/badge.svg`,
  },
  {
    url: `https://github.com/stimulus-components/stimulus-${props.packageName}`,
    img: `https://img.shields.io/github/license/stimulus-components/stimulus-${props.packageName}.svg`,
  },
]
</script>
