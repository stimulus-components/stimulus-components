<template>
  <Block title="Tabs">
    <div data-controller="tabs">
      <div data-tabs-target="tablist" aria-label="Account settings" class="flex border-b dark:border-gray-700">
        <button
          v-for="tab in tabs"
          :key="tab"
          data-tabs-target="tab"
          data-action="click->tabs#select keydown->tabs#navigate"
          class="border-b-2 border-transparent px-4 py-2 font-medium text-gray-600 aria-selected:border-blue-600 aria-selected:text-blue-600 dark:text-gray-300 dark:aria-selected:text-blue-400"
        >
          {{ tab }}
        </button>
      </div>

      <section v-for="tab in tabs" :key="tab" data-tabs-target="panel" class="py-6 dark:text-gray-300">
        {{ tab }} settings
      </section>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"

const tabs = ["Account", "Password", "Billing"]
</script>
