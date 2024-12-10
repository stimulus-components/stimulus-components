<template>
  <div class="bg-[#FAFAFA] py-16">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-4xl font-bold leading-8 tracking-tight text-primary text-center">Several types of components</h2>

      <p class="text-text-secondary font-light leading-8 mt-3 text-center">
        Several Stimulus components, several fonctions
      </p>

      <ul class="mt-16 grid items-stretch gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ComponentCard v-for="component in components" :key="component.title" :component="component" />
      </ul>

      <div class="mt-12 flex justify-center">
        <UIButton href="/docs" variant="secondary">Explore 25+ components</UIButton>
      </div>
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
        ],
      },
    })
    .find(),
)
</script>
