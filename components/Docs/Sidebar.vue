<template>
  <nav>
    <ul class="space-y-9 whitespace-nowrap">
      <li v-for="section in sections" :key="section.title">
        <h2 class="dark:text-white font-display font-medium text-slate-900">
          {{ section.title }}
        </h2>

        <ul class="mt-4 space-y-4 border-l-2 border-slate-100 lg:border-slate-200">
          <li v-for="link in section.links" :key="link.title" class="relative">
            <NuxtLink
              :to="link._path"
              class="flex gap-2 items-center pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-orange-600 hover:before:block"
              exact-active-class="!text-orange-500 before:!bg-orange-500 before:!block"
            >
              <component :is="link.icon" v-if="link.icon" class="size-5" />

              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RocketLaunchIcon, BeakerIcon } from '@heroicons/vue/24/outline'

const { data: components } = await useAsyncData('sidebar-components', () =>
  queryContent('docs').sort({ title: 1 }).find(),
)

const sections = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Introduction', _path: '/docs', icon: RocketLaunchIcon },
      { title: 'Installation', _path: '/docs/installation', icon: BeakerIcon },
    ],
  },
  {
    title: 'Components',
    links: toValue(components),
  },
]
</script>
