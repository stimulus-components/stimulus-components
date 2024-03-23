<template>
  <div class="hidden lg:block">
    <nav class="whitespace-nowrap">
      <h3 class="font-display text-sm font-medium text-slate-900 dark:text-white">Community</h3>

      <ol role="list" class="mt-2 space-y-3 text-slate-500">
        <li v-for="link in links" :key="link.title">
          <a class="hover:text-orange-600 flex gap-2 items-center" :href="link.path" target="_blank">
            <component :is="link.icon" class="size-5" />
            {{ link.title }}
          </a>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup>
import { PencilSquareIcon, StarIcon, HeartIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const links = [
  {
    title: 'Edit this page',
    icon: PencilSquareIcon,
    path: `https://github.com/stimulus-components/stimulus-components/blob/master/content/docs/${route.params.slug}.md`,
  },
  { title: 'Star on GitHub', icon: StarIcon, path: 'https://github.com/stimulus-components/stimulus-components' },
  { title: 'Become a sponsor', icon: HeartIcon, path: 'https://github.com/sponsors/stimulus-components' },
]
</script>
