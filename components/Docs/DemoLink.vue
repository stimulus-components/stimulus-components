<template>
  <div>
    <h2>👀 Demo</h2>

    <a :href="`https://stimulus-${packageName}.stimulus-components.com`" target="_blank"> See demo </a>
  </div>
</template>

<script>
export default {
  name: 'DocsDemoLink',

  props: {
    packageName: {
      type: String,
      required: true,
    },
  },
}
</script>
