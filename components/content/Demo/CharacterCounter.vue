<template>
  <Block title="Character Counter">
    <div data-controller="character-counter">
      <textarea
        data-character-counter-target="input"
        class="shadow-sm appearance-none border w-full py-2 px-3 rounded-l-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="What's happening?"
      ></textarea>

      <p class="mt-2 text-md text-gray-800 dark:text-gray-300">
        There are <strong data-character-counter-target="counter"></strong> characters in this textarea.
      </p>
    </div>
  </Block>
</template>

<script setup>
import Block from '@/components/UI/Block.vue'
</script>
