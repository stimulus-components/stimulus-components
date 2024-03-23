<template>
  <a
    href="https://github.com/stimulus-components/stimulus-components"
    class="flex gap-1 items-center text-gray-700 dark:text-white dark:hover:text-gray-300 hover:text-gray-600"
  >
    <span class="sr-only">GitHub</span>
    <GithubIcon />

    <span class="hidden sm:block">
      {{ formatCompactNumber(data?.stargazers_count) }}
    </span>
  </a>
</template>

<script setup>
import GithubIcon from '@/components/Icons/GithubIcon.vue'
import { formatCompactNumber } from '@/utils/helpers'
const { data } = await useFetch('https://api.github.com/repos/stimulus-components/stimulus-components')
</script>
