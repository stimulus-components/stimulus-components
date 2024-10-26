<template>
  <Block title="Scroll Reveal">
    <div class="max-h-56 overflow-scroll">
      <p>Keep scrolling 👇</p>

      <div class="h-screen"></div>

      <div data-controller="scroll-reveal">
        <p data-scroll-reveal-target="item" class="reveal">Hello</p>
        <p data-scroll-reveal-target="item" class="reveal" data-delay="250ms">World!</p>
        <p data-scroll-reveal-target="item" class="reveal" data-delay="500ms">Keep scrolling 👇</p>
      </div>

      <div class="h-screen"></div>

      <div data-controller="scroll-reveal" data-scroll-reveal-threshold-value="0.9">
        <p data-scroll-reveal-target="item" class="reveal">With custom</p>
        <p data-scroll-reveal-target="item" class="reveal">options!</p>
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>

<style>
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: 1s cubic-bezier(0.5, 0, 0, 1);
  transition-property: opacity, transform;
}

.reveal.in {
  opacity: 1;
  transform: none;
}
</style>
