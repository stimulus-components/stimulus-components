<template>
  <Block title="Valid Form">
    <form action="/" data-controller="valid-form" class="mt-16 flex flex-col items-center">
      <label for="options"
        >Required select
        <select
          id="options"
          name="options"
          required
          class="block border rounded py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-96 bg-white"
        >
          <option value="" disabled selected>Select an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </select>
      </label>

      <label for="text"
        >Required input text
        <input
          id="text"
          type="text"
          required
          minlength="4"
          maxlength="8"
          placeholder="Type at least 4 characters"
          class="block appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 w-96"
        />
      </label>

      <label class="block mb-4 w-96">
        <input id="agree" type="checkbox" name="agree" required />
        The submit button will not be enabled until all fields in the form successfully pass all validations.
      </label>

      <input
        type="submit"
        class="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 border rounded shadow disabled:opacity-40 mx-auto px-8 py-2 text-sm rounded-md shadow-sm disabled:cursor-not-allowed w-96"
      />
    </form>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
