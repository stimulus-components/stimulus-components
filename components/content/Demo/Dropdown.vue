<template>
  <Block title="Dropdown">
    <div data-controller="dropdown" class="relative inline-block text-left">
      <div>
        <button
          type="button"
          data-action="dropdown#toggle click@window->dropdown#hide"
          class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          Options

          <ChevronDownIcon class="-mr-1 ml-2 size-4" />
        </button>
      </div>

      <div
        data-dropdown-target="menu"
        class="hidden transition transform origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        data-transition-enter-from="opacity-0 scale-95"
        data-transition-enter-to="opacity-100 scale-100"
        data-transition-leave-from="opacity-100 scale-100"
        data-transition-leave-to="opacity-0 scale-95"
      >
        <div class="py-1">
          <NuxtLink
            v-for="link in links"
            :key="link.title"
            :to="link.path"
            data-action="dropdown#toggle"
            class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm"
            :class="{ 'bg-gray-100 text-gray-900': link.title === 'Installation' }"
          >
            {{ link.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </Block>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import Block from '@/components/UI/Block.vue'

const links = [
  { title: 'Docs', path: '/docs' },
  { title: 'Installation', path: '/docs/installation' },
  { title: 'Sponsors', path: '/sponsors' },
]
</script>
