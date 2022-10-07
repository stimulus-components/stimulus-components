<template>
  <div>
    <DocsBadges v-if="component" :package-name="component.package" :netlify-id="component.netlify_id" />

    <p>
      This component is available on
      <a :href="githubUrl" target="_blank">GitHub</a>.
    </p>

    <h1>Stimulus {{ component.title }}</h1>
    <p>{{ component.description }}</p>

    <NuxtContent :document="component" />
  </div>
</template>

<script>
export default {
  name: 'DocsShow',
  layout: 'docs',

  async asyncData({ $content, params: { slug } }) {
    return {
      component: await $content(`docs/${slug}`).fetch(),
    }
  },

  head() {
    return {
      title: `Stimulus ${this.component.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.component.description,
        },
      ],
    }
  },

  computed: {
    githubUrl() {
      return `https://github.com/stimulus-components/stimulus-${this.component.package}`
    },
  },
}
</script>
