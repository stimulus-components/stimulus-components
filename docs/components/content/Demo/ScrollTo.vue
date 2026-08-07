<template>
  <Block title="Scroll To">
    <a
      id="scroll-to-demo-top"
      href="#scroll-to-demo-bottom"
      data-controller="scroll-to"
      data-scroll-to-offset-value="100"
      class="text-yellow-600"
    >
      Scroll down to the target &darr;
    </a>

    <!-- The controller drives window.scrollTo, so the demo needs real vertical distance to show anything. -->
    <div class="h-96"></div>

    <p id="scroll-to-demo-bottom" class="font-semibold">Here it is 🎉</p>

    <a href="#scroll-to-demo-top" data-controller="scroll-to" data-scroll-to-offset-value="100" class="text-yellow-600">
      Scroll back up &uarr;
    </a>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
