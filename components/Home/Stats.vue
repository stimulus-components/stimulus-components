<template>
  <div class="bg-gray-50 dark:bg-slate-800 pt-12 sm:pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Numbers speak for themselves</h2>

        <p class="mt-3 text-xl text-gray-500 sm:mt-4">
          Stimulus Components is the library of choice when you are working with Stimulus JS.
        </p>
      </div>
    </div>

    <div class="mt-10 pb-12 bg-white dark:bg-slate-800 sm:pb-16">
      <div class="relative">
        <div class="absolute inset-0 h-1/2 bg-gray-50 dark:bg-slate-800"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <dl class="rounded-lg bg-white dark:bg-slate-900 shadow-lg sm:grid sm:grid-cols-3">
              <div
                v-for="stat in stats"
                :key="stat.title"
                class="flex flex-col border-b border-gray-100 dark:border-slate-800 p-6 text-center sm:border-0 sm:border-r"
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
import { ref } from 'vue'
import { useFetch, useAsyncData } from 'nuxt/app'
import { prettyNumber } from '@/utils/helpers'

const stats = ref([
  { title: 'Packages', count: '25+' },
  { title: 'Contributors', count: '15+' },
])

const { data } = await useAsyncData('packages-stats', () =>
  queryContent('docs').only(['package', 'packagePath']).find(),
)

const baseUrl = 'https://api.npmjs.org/downloads/point/last-year'

// TODO: Only keep packagePath in the future.
const packages = new Set(data.value.flatMap((p) => [`${baseUrl}/stimulus-${p.package}`, `${baseUrl}/${p.packagePath}`]))

const responses = await Promise.all([...packages].map((url) => useFetch(url)))
const count = responses.reduce((total, { data }) => total + (data?.value?.downloads || 0), 0)

if (count) {
  stats.value.push({
    title: 'Downloads last year',
    count: `${prettyNumber(count)}+`,
  })
}
</script>
