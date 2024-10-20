<template>
  <iframe class="w-full aspect-video" :src="`https://www.youtube.com/embed/${id}`" allowfullscreen></iframe>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>
