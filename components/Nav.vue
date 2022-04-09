<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex w-full">
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
                class="h-6 w-6"
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
                class="h-6 w-6"
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

          <div class="hidden md:flex ml-6 gap-8">
            <NuxtLink
              v-for="link in links"
              :key="link.url"
              :to="link.url"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-orange-500 text-gray-900"
            >
              {{ link.title }}
            </NuxtLink>
          </div>

          <AlgoliaSearchBox />
        </div>
      </div>
    </div>

    <div id="mobile-menu" class="md:hidden" :class="{ hidden: !opened }">
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
          active-class="bg-orange-50 border-orange-500 text-orange-700"
          >{{ link.title }}</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',

  data() {
    return {
      opened: false,
      links: [
        { title: 'Docs', url: '/docs' },
        { title: 'Sponsors', url: '/sponsors' },
      ],
    }
  },

  methods: {
    toggleOpened() {
      this.opened = !this.opened
    },
  },
}
</script>
