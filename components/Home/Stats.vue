<template>
  <div class="bg-gray-50 pt-12 sm:pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Numbers speak for themselves</h2>
        <p class="mt-3 text-xl text-gray-500 sm:mt-4">
          Stimulus Components is the library of choice when you are working with Stimulus JS.
        </p>
      </div>
    </div>

    <div class="mt-10 pb-12 bg-white sm:pb-16">
      <div class="relative">
        <div class="absolute inset-0 h-1/2 bg-gray-50"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
              <div
                v-for="stat in stats"
                :key="stat.title"
                class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r"
              >
                <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{{ stat.title }}</dt>
                <dd
                  class="order-1 text-4xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
                >
                  {{ stat.count }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFetch, useAsyncData } from 'nuxt/app'

const stats = ref([
  { title: 'Packages', count: '25+' },
  { title: 'Contributors', count: '15+' },
])

const prettyNumber = (number) => {
  return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4 }).format(number)
}

const downloadsEndpoint = computed(() => {
  const lastYear = new Date()
  lastYear.setFullYear(lastYear.getFullYear() - 1)

  const from = lastYear.toISOString().substring(0, 10)
  const until = new Date().toISOString().substring(0, 10)

  return `https://api.npmjs.org/downloads/point/${from}:${until}/${packages.value.join(',')}`
})

const { data: packages } = await useAsyncData('packages', () => queryContent('docs').only(['package']).find())
packages.value = packages.value.map((p) => `stimulus-${p.package}`)

const { data } = await useFetch(downloadsEndpoint.value)
const count = Object.values(data.value).reduce((acc, item) => acc + (item?.downloads || 0), 0)

if (count) {
  stats.value.push({
    title: 'Downloads last year',
    count: `${prettyNumber(count)}+`,
  })
}
</script>
