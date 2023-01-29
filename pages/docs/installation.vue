<template>
  <div>
    <NuxtContent :document="component" />
  </div>
</template>

<script>
export default {
  name: 'Installation',
  layout: 'docs',

  async asyncData({ $content }) {
    return {
      component: await $content('pages/installation').fetch(),
    }
  },

  head() {
    return {
      title: 'Installation',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'How to install dependencies and structure your app.',
        },
      ],
    }
  },
}
</script>
