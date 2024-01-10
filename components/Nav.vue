<template>
  <nav class="bg-white shadow sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex w-full gap-8 items-center">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click.prevent="toggleOpened"
            >
              <span class="sr-only">Open main menu</span>

              <svg
                :class="{ hidden: opened }"
                class="size-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              <svg
                :class="{ hidden: !opened }"
                class="size-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="flex flex-col font-bold">
              <span>Stimulus</span>
              <span class="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
                >Components</span
              >
            </NuxtLink>
          </div>

          <div class="hidden md:flex gap-4 h-full">
            <NuxtLink
              v-for="link in links"
              :key="link.url"
              :to="link.url"
              class="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              active-class="border-b-2 border-orange-500 text-gray-900"
            >
              {{ link.title }}
            </NuxtLink>
          </div>

          <AlgoliaDocSearch class="my-auto ml-auto" />

          <a href="https://github.com/stimulus-components" class="text-gray-700 hover:text-gray-600">
            <span class="sr-only">GitHub</span>
            <svg class="size-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div id="mobile-menu" class="md:hidden" :class="{ hidden: !opened }">
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          class="text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 text-base font-medium sm:pl-5 sm:pr-6"
          active-class="bg-orange-50 border-l-4 border-orange-500 text-orange-700"
        >
          {{ link.title }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const opened = ref(false)
const links = [
  { title: 'Docs', url: '/docs/' },
  { title: 'Sponsors', url: '/sponsors/' },
]

const toggleOpened = () => {
  opened.value = !opened.value
}
</script>
