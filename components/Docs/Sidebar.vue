<template>
  <nav>
    <ul class="space-y-1 text-gray-700 whitespace-nowrap">
      <li v-for="component in components" :key="component.path" class="">
        <NuxtLink
          :to="component.path"
          class="px-2 rounded font-medium py-1 hover:text-orange-500 flex items-center justify-between"
          active-class="text-orange-400 bg-orange-50"
        >
          {{ component.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'DocsSidebar',

  data() {
    return {
      components: [],
    }
  },

  async fetch() {
    this.components = await this.$content('docs').sortBy('title').fetch()
  },
}
</script>
