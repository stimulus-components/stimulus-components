<template>
  <div class="py-16 max-w-7xl mx-auto px-4">
    <h2 class="text-4xl font-bold leading-8 tracking-tight text-center text-primary dark:text-primary-dark">
      Versatile and modular components for every need
    </h2>

    <p
      class="max-w-2xl mx-auto text-text-secondary dark:text-text-secondary-dark font-light leading-6 mt-3 text-pretty text-center"
    >
      Stimulus Components provides a flexible API that allows you to control the level of detail to your preference.
      Begin with high-level components featuring built-in DOM structures, and extend the controllers as needed to tailor
      their behavior.
    </p>

    <ul class="mt-16 grid items-stretch gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ComponentCard v-for="component in components" :key="component.title" :component="component" />
    </ul>

    <div class="mt-12 flex justify-center">
      <UIButton href="/docs" variant="secondary">Explore 25+ components</UIButton>
    </div>
  </div>
</template>

<script setup>
import ComponentCard from "@/components/Home/ComponentCard.vue"

const { data: components } = await useAsyncData("components-list", () =>
  queryContent("docs")
    .sort({ title: 1 })
    .where({
      package: {
        $in: [
          "character-counter",
          "chartjs",
          "checkbox-select-all",
          "clipboard",
          "dropdown",
          "password-visibility",
          "auto-submit",
          "rails-nested-form",
          "dialog",
          "textarea-autogrow",
        ],
      },
    })
    .find(),
)
</script>
