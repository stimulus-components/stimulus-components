<template>
  <Block title="Popover">
    <div data-controller="popover">
      This is my GitHub card available on
      <a
        href="https://github.com/stimulus-components/stimulus-components"
        class="relative"
        data-action="mouseenter->popover#show mouseleave->popover#hide"
      >
        <span class="text-blue-600 no-underline hover:underline">GitHub</span>.</a
      >

      <div class="hidden" data-popover-target="content">
        <div
          data-popover-target="card"
          class="max-w-sm rounded-lg shadow-lg bg-white absolute left-0"
          style="bottom: 2rem; width: max-content"
        >
          <div class="px-6 py-4 flex">
            <img
              class="rounded-full h-16 w-16"
              src="https://avatars0.githubusercontent.com/u/8252238?s=460&u=3ba211d048536bfe01d120894eba9d3254db70d5&v=4"
              alt=""
            />

            <div class="ml-4">
              <div class="font-bold text-xl mb-2 text-black">Guillaume Briday</div>
              <p class="text-gray-500 text-sm">This content is in a hidden template.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
