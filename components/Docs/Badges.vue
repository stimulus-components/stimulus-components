<template>
  <ul class="flex flex-wrap gap-2 not-prose list-none px-0 mb-8">
    <li v-for="badge in badges" :key="badge.img">
      <a :href="badge.url" target="_blank">
        <img loading="lazy" :src="badge.img" alt="" />
      </a>
    </li>

    <li v-if="netlifyId">
      <a :href="`https://stimulus-${packageName}.netlify.com`" target="_blank">
        <img loading="lazy" :src="`https://api.netlify.com/api/v1/badges/${netlifyId}/deploy-status`" alt="" />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DocsBadges',

  props: {
    packageName: {
      type: String,
      required: true,
    },
    netlifyId: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      badges: [
        {
          url: `https://www.npmjs.com/package/stimulus-${this.packageName}`,
          img: `https://img.shields.io/npm/dt/stimulus-${this.packageName}.svg`,
        },
        {
          url: `https://www.npmjs.com/package/stimulus-${this.packageName}`,
          img: `https://img.shields.io/bundlephobia/minzip/stimulus-${this.packageName}.svg`,
        },
        {
          url: `https://www.npmjs.com/package/stimulus-${this.packageName}`,
          img: `https://img.shields.io/npm/v/stimulus-${this.packageName}.svg`,
        },
        {
          url: `https://www.npmjs.com/package/stimulus-${this.packageName}`,
          img: `https://github.com/stimulus-components/stimulus-${this.packageName}/workflows/Lint/badge.svg`,
        },
        {
          url: `https://github.com/stimulus-components/stimulus-${this.packageName}`,
          img: `https://img.shields.io/github/license/stimulus-components/stimulus-${this.packageName}.svg`,
        },
      ],
    }
  },
}
</script>
