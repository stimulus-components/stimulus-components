<template>
  <Block title="Carousel">
    <div
      data-controller="carousel"
      class="swiper"
      data-carousel-options-value='{ "navigation": { "nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev" } }'
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="h-64 flex justify-center items-center">Slide 1</div>
        </div>

        <div class="swiper-slide">
          <div class="h-64 flex justify-center items-center">Slide 2</div>
        </div>

        <div class="swiper-slide">
          <div class="h-64 flex justify-center items-center">Slide 3</div>
        </div>
      </div>

      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
import "swiper/css/bundle"
</script>
