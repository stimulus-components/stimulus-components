<template>
  <Block title="Confirmation">
    <form data-controller="confirmation" class="space-y-3">
      <div>
        <label for="confirmation" class="block text-sm/6 font-medium text-gray-900">Type "DELETE" to confirm</label>
        <div class="mt-2">
          <input
            id="confirmation"
            data-confirmation-target="input"
            data-confirmation-content="DELETE"
            data-action="confirmation#check"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
            placeholder="Are you sure?"
          />
        </div>
      </div>

      <button
        type="submit"
        data-confirmation-target="item"
        disabled
        class="disabled:cursor-not-allowed disabled:bg-red-300 rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Delete
      </button>
    </form>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
