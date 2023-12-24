<template>
  <div>
    <h2>👀 Demo</h2>

    <a
      :href="`https://stimulus-${packageName}.stimulus-components.com`"
      target="_blank"
      class="hover:text-white no-underline rounded-md text-white py-3 px-8 bg-gradient-to-r from-yellow-500 to-orange-500"
    >
      See demo &rarr;
    </a>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  packageName: {
    type: String,
    required: true,
  },
})
</script>
