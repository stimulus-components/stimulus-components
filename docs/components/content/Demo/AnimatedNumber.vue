<template>
  <Block title="Animated Number">
    Counting from <strong>0</strong> to <strong>100</strong> in <strong>3</strong> seconds:
    <strong
      data-controller="animated-number"
      data-animated-number-start-value="0"
      data-animated-number-end-value="100"
      data-animated-number-duration-value="3000"
      class="text-2xl"
    ></strong>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
