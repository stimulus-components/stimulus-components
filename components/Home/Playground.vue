<template>
  <div class="py-24 sm:py-32 mx-auto max-w-6xl">
    <div class="mx-auto px-6 lg:px-8">
      <div class="mx-auto max-w-xl text-center">
        <h2 class="text-lg font-semibold leading-8 tracking-tight text-orange-600">Playground</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Try them out!</p>
      </div>
    </div>

    <div class="mt-16 grid md:grid-cols-2 gap-8">
      <CheckboxSelectAll />
      <Clipboard />
      <CharacterCounter />
      <Dropdown />
    </div>

    <ComponentsMoreButton />
  </div>
</template>

<script setup>
import CheckboxSelectAll from '@/components/content/Demo/CheckboxSelectAll.vue'
import Clipboard from '@/components/content/Demo/Clipboard.vue'
import CharacterCounter from '@/components/content/Demo/CharacterCounter.vue'
import Dropdown from '@/components/content/Demo/Dropdown.vue'
import ComponentsMoreButton from '@/components/Home/ComponentsMoreButton.vue'
</script>
