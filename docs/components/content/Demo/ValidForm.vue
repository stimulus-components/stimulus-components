<template>
  <Block title="Valid Form">
    <form action="/" data-controller="valid-form">
      <label class="block text-gray-700 text-sm font-bold mb-2"
        >This input has the attributes: required, minimum length, and maximum length. Enter a valid input to enable the
        submit button.
      </label>
      <input
        type="text"
        required
        minlength="4"
        maxlength="8"
        class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        type="submit"
        class="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 border rounded shadow disabled:opacity-40 mx-auto px-8 py-2 text-sm rounded-md shadow-sm disabled:cursor-not-allowed"
      />
    </form>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
