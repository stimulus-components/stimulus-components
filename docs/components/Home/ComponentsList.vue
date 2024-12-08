<template>
  <div class="py-16 bg-[#FAFAFA] -mx-4">
    <div class="mx-auto max-w-6xl">
      <div class="mx-auto px-6 lg:px-8">
        <div class="mx-auto max-w-xl text-center">
          <h2 class="text-4xl font-bold leading-8 tracking-tight text-primary">Several types of components</h2>

          <p class="mt-3 text-text-secondary font-medium sm:mt-4">Several Stimulus components, several fonctions</p>
        </div>
      </div>

      <ul class="mt-16 grid items-stretch gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ComponentCard v-for="component in components" :key="component.title" :component="component" />
      </ul>

      <ComponentsMoreButton />
    </div>
  </div>
</template>

<script setup>
import ComponentCard from "@/components/Home/ComponentCard.vue"
import ComponentsMoreButton from "@/components/Home/ComponentsMoreButton.vue"

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
