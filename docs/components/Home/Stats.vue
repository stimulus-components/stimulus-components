<template>
  <div class="bg-secondary dark:bg-secondary-dark py-12">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-4xl font-bold leading-8 tracking-tight text-primary text-center">Numbers speak for themselves</h2>

      <p class="text-primary font-light leading-8 mt-3 text-center">
        Stimulus Components is already used by hundreds of developers and many companies.
      </p>

      <div class="mt-10 max-w-4xl mx-auto">
        <dl class="grid md:grid-cols-3 gap-8">
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="bg-gradient-to-tr from-surface-primary to-tertiary p-0.5 rounded-3xl"
          >
            <div class="flex flex-col bg-white dark:bg-primary rounded-3xl dark:border-slate-800 p-6 text-center">
              <dt class="order-2 mt-2 text-lg leading-6 font-medium text-text-secondary dark:text-text-secondary-dark">
                {{ stat.title }}
              </dt>
              <dd class="order-1 text-4xl font-extrabold text-primary dark:text-primary-dark">
                {{ stat.count }}
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useFetch, useAsyncData } from "nuxt/app"
import { prettyNumber } from "@/utils"

const stats = ref([
  { title: "Components", count: "25+" },
  { title: "Contributors", count: "15+" },
])

const { data } = await useAsyncData("packages-stats", () =>
  queryContent("docs").only(["package", "packagePath"]).find(),
)

const baseUrl = "https://api.npmjs.org/downloads/point/last-year"

// TODO: Only keep packagePath in the future.
const packages = new Set(data.value.flatMap((p) => [`${baseUrl}/stimulus-${p.package}`, `${baseUrl}/${p.packagePath}`]))

const responses = await Promise.all([...packages].map((url) => useFetch(url)))
const count = responses.reduce((total, { data }) => total + (data?.value?.downloads || 0), 0)

if (count) {
  stats.value.push({
    title: "Downloads last year",
    count: `${prettyNumber(count)}+`,
  })
}
</script>
