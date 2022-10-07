<template>
  <iframe class="w-full aspect-video" :src="`https://www.youtube.com/embed/${id}`" allowfullscreen></iframe>
</template>

<script>
export default {
  name: 'Youtube',

  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
