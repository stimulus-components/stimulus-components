<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <h2 class="text-center text-lg font-semibold leading-8 text-gray-900 dark:text-white">
        Trusted by the world’s most innovative teams
      </h2>
      <div
        class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
      >
        <div v-for="sponsor in sponsors" :key="sponsor.name">
          <a :href="sponsor.url" target="_blank" rel="noopener noreferrer">
            <img
              :src="`/sponsors/${sponsor.src}`"
              :alt="sponsor.name"
              class="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const sponsors = [
  {
    name: 'SpendHQ',
    src: 'spendhq.svg',
    url: 'https://www.spendhq.com/',
  },
  {
    name: 'Maybe',
    src: 'maybe.png',
    url: 'https://maybe.co/',
  },
  {
    name: 'Avo',
    src: 'avo.svg',
    url: 'https://avohq.io/',
  },
  {
    name: 'SearchApi',
    src: 'searchapi.svg',
    url: 'https://searchapi.io/',
  },
]
</script>
