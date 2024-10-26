<template>
  <Block title="Timeago">
    Stimulus 1.0.0 was released

    <time
      data-controller="timeago"
      data-timeago-datetime-value="2018-01-30T09:00"
      data-timeago-include-seconds-value="true"
      data-timeago-add-suffix-value="true"
    ></time
    >.
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
