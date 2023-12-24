<template>
  <nav>
    <h2 class="font-semibold mb-2 px-2 py-1">Getting Started</h2>

    <ul class="space-y-1 text-gray-700 whitespace-nowrap mb-8">
      <li v-for="link in links" :key="link.path">
        <NuxtLink
          :to="link.path"
          class="rounded px-2 py-1 hover:text-orange-500 flex"
          exact-active-class="text-orange-400 bg-orange-50"
        >
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>

    <h2 class="font-semibold mb-2 px-2 py-1">Components</h2>

    <ul class="space-y-1 text-gray-700 whitespace-nowrap">
      <li v-for="component in components" :key="component.path">
        <NuxtLink
          :to="component._path"
          class="rounded px-2 py-1 hover:text-orange-500 flex"
          exact-active-class="text-orange-400 bg-orange-50"
        >
          {{ component.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const links = [
  { title: 'Introduction', path: '/docs' },
  { title: 'Installation', path: '/docs/installation' },
]

const { data: components } = await useAsyncData('components', () => queryContent('docs').sort({ title: 1 }).find())
</script>
