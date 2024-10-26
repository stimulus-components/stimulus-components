<template>
  <Block title="Rails Nested Form">
    <form data-controller="nested-form">
      <div v-pre class="hidden" type="text/x-template" data-nested-form-target="template">
        <div class="mt-4 nested-form-wrapper" data-new-record="true">
          <label for="NEW_RECORD" class="block text-sm font-medium leading-5 text-gray-700">New todo</label>
          <div class="mt-1 flex relative rounded-md shadow-sm">
            <input
              id="NEW_RECORD"
              name="user[todos_attributes][NEW_RECORD][description]"
              class="appearance-none border w-full py-2 px-3 rounded-l-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your todo"
            />

            <button
              class="cursor-pointer inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-100 text-gray-500 sm:text-sm"
              type="button"
              data-action="nested-form#remove"
              title="Remove todo"
            >
              X
            </button>

            <input type="hidden" name="user[todos_attributes][NEW_RECORD][_destroy]" />
          </div>
        </div>
      </div>

      <div class="mt-4 nested-form-wrapper" data-new-record="false">
        <label for="todo-1" class="block text-sm font-medium leading-5 text-gray-700">Your todo</label>
        <div class="mt-1 flex relative rounded-md shadow-sm">
          <input
            id="todo-1"
            name="user[todos_attributes][0][description]"
            class="appearance-none border w-full py-2 px-3 rounded-l-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value="Pet the cat"
          />

          <button
            class="cursor-pointer inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-100 text-gray-500 sm:text-sm"
            type="button"
            data-action="nested-form#remove"
            title="Remove todo"
          >
            X
          </button>

          <input type="hidden" name="user[todos_attributes][0][_destroy]" />
        </div>
      </div>

      <div id="nested-form-target" data-nested-form-target="target"></div>

      <div class="flex gap-2 mt-4">
        <button
          id="nested-form-button"
          type="button"
          data-action="nested-form#add"
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
        >
          Add todo
        </button>

        <button
          type="button"
          class="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 border rounded shadow"
        >
          Save todos
        </button>
      </div>
    </form>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
