<template>
  <div>
    <div class="flex-1">
      <p class="font-display text-sm font-medium text-orange-500 mb-2">Components</p>

      <div class="flex flex-col flex-wrap items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight mb-0">Stimulus {{ data.title }}</h1>

        <div class="flex justify-items-end">
          <a
            :href="githubUrl"
            target="_blank"
            class="flex gap-2 items-center no-underline rounded-md bg-slate-900 !text-white hover:bg-slate-700 px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300"
          >
            <GithubIcon />

            GitHub
          </a>
        </div>
      </div>

      <p class="mt-4 text-lg text-gray-500">{{ data.description }}</p>
    </div>

    <div class="flex gap-2 not-prose">
      <img :src="`https://img.shields.io/npm/dt/${data.packagePath}.svg`" alt="" />
      <img :src="`https://img.shields.io/npm/v/${data.packagePath}.svg`" alt="" />
    </div>

    <hr />

    <ContentRendererMarkdown :value="data" />
  </div>
</template>

<script setup>
import GithubIcon from "@/components/Icons/GithubIcon.vue"

definePageMeta({
  layout: "docs",
})

const route = useRoute()
const { data } = await useAsyncData(`component-${route.params.slug}`, () =>
  queryContent(`docs/${route.params.slug}`).findOne(),
)

const githubUrl = computed(() => `https://github.com/stimulus-components/stimulus-${data.value.package}`)

useHead({
  title: `Stimulus ${data.value.title}`,
  meta: [
    {
      name: "description",
      content: data.value.description,
    },
  ],
})
</script>
