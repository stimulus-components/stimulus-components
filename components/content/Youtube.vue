<template>
  <iframe class="w-full aspect-video" :src="`https://www.youtube.com/embed/${id}`" allowfullscreen></iframe>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>
