<template>
  <Block title="Pluralize">
    <div data-controller="pluralize">
      <input
        data-pluralize-target="input"
        class="shadow-sm appearance-none border w-full py-2 px-3 rounded-l-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="0"
      >

      <p class="mt-2 text-md text-gray-800">
        There
        <span data-pluralize-target="text" data-singular="is" data-plural="are"></span>
        <strong data-pluralize-target="value"></strong>
        <span data-pluralize-target="text" data-singular="puppy" data-plural="puppies"></span>
        from this input.
      </p>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
