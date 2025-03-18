<template>
  <Block title="Radio Uncheck">
    <form data-controller="radio-uncheck" class="space-y-4">
      <div class="flex items-center gap-x-3">
        <input
          id="team-1"
          data-radio-uncheck-target="radio"
          name="team"
          type="radio"
          class="size-4 border-gray-300 text-orange-600 focus:ring-orange-600"
        />
        <label for="team-1" class="block text-sm/6 font-medium text-gray-900">Team 1</label>
      </div>
      <div class="flex items-center gap-x-3">
        <input
          id="team-2"
          data-radio-uncheck-target="radio"
          name="team"
          type="radio"
          class="size-4 border-gray-300 text-orange-600 focus:ring-orange-600"
        />
        <label for="team-2" class="block text-sm/6 font-medium text-gray-900">Team 2</label>
      </div>
      <div class="flex items-center gap-x-3">
        <input
          id="team-3"
          data-radio-uncheck-target="radio"
          name="team"
          type="radio"
          class="size-4 border-gray-300 text-orange-600 focus:ring-orange-600"
        />
        <label for="team-3" class="block text-sm/6 font-medium text-gray-900">Team 3</label>
      </div>
      <div>
        <button
          type="button"
          data-action="radio-uncheck#uncheck"
          class="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
        >
          Uncheck
        </button>
      </div>
    </form>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
