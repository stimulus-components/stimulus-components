<template>
  <Block title="Pluralize">
    <h2 class="text-xl mt-8 mb-2">Using input</h2>
    <div data-controller="pluralize">
      <input
        data-pluralize-target="input"
        class="shadow-sm appearance-none border w-full py-2 px-3 rounded-l-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="0"
      >

      <p class="mt-2 text-md text-gray-800">
        There <span data-pluralize-target="text" data-singular="is" data-plural="are"></span> <strong data-pluralize-target="value"></strong> <span data-pluralize-target="text" data-singular="puppy" data-plural="puppies"></span> from this input.
      </p>
    </div>

    <h2 class="text-xl mt-8 mb-2">Observing changes</h2>
    <div data-controller="character-counter pluralize">
      <textarea
        data-character-counter-target="input"
        class="shadow-sm appearance-none border w-full py-2 px-3 rounded-l-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="What's happening?"
      ></textarea>

      <p class="mt-2 text-md text-gray-800 dark:text-gray-300">
        There <span data-pluralize-target="text" data-singular="is" data-plural="are"></span> <strong data-character-counter-target="counter" data-pluralize-target="observe"></strong> <span data-pluralize-target="text" data-singular="character" data-plural="characters"></span> in this textarea.
      </p>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
