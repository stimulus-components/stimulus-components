<template>
  <Block title="Reveal Controller">
    <div data-controller="reveal">
      <button
        id="toggle-button"
        data-action="click->reveal#toggle"
        type="button"
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
      >
        Toggle me!
      </button>

      <p id="toggle-target" data-reveal-target="item" class="hidden mt-4">Hey 👋</p>
    </div>

    <div data-controller="reveal" class="mt-4">
      <button
        id="toggle-button"
        data-action="click->reveal#hide"
        type="button"
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
      >
        Hide me!
      </button>

      <p id="toggle-target" data-reveal-target="item" class="mt-4">Hey 🙈</p>
    </div>

    <div data-controller="reveal" class="mt-4">
      <button
        id="toggle-button"
        data-action="click->reveal#show"
        type="button"
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
      >
        Show me!
      </button>

      <p id="toggle-target" data-reveal-target="item" class="hidden mt-4">Hi 🐵</p>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
