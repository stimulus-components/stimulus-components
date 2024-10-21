<template>
  <Block title="Color Picker">
    <div class="flex gap-8 justify-center text-center">
      <div data-controller="color-picker">
        <label>Classic</label>
        <input type="hidden" name="color" value="#F56565" data-color-picker-target="input" />

        <div data-color-picker-target="button"></div>
      </div>

      <div data-controller="color-picker" data-color-picker-theme-value="monolith">
        <label>Monolith</label>
        <input type="hidden" name="color" value="#667EEA" data-color-picker-target="input" />

        <div data-color-picker-target="button"></div>
      </div>

      <div data-controller="color-picker" data-color-picker-theme-value="nano">
        <label>Nano</label>
        <input type="hidden" name="color" value="#48BB78" data-color-picker-target="input" />

        <div data-color-picker-target="button"></div>
      </div>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
import "@simonwep/pickr/dist/themes/classic.min.css"
import "@simonwep/pickr/dist/themes/monolith.min.css"
import "@simonwep/pickr/dist/themes/nano.min.css"
</script>
