<template>
  <Block title="Chartjs">
    <div
      data-controller="chart"
      data-chart-data-value='{ "labels": ["January", "February", "March", "April", "May", "June", "July"], "datasets": [{ "label": "My First dataset", "backgroundColor": "transparent", "tension": 0.1, "borderColor": "#3B82F6", "data": [37, 83, 78, 54, 12, 5, 99] }] }'
    >
      <canvas data-chart-target="canvas"></canvas>
    </div>
  </Block>
</template>

<script setup>
import Block from "@/components/UI/Block.vue"
</script>
