<template>
  <Block title="Scroll Progress">
    <div
      data-controller="scroll-progress"
      data-scroll-progress-throttle-delay-value="0"
      class="h-1 bg-gradient-to-r from-yellow-500 to-orange-500 fixed top-0 inset-x-0 z-50"
    ></div>

    <p>Scroll down to see the progress bar 👇</p>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
