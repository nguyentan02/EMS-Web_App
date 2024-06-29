<script setup>
import chartPie from "../components/chart.vue";
import chartBar from "../components/chartBar.vue";
import chartBar2 from "../components/chartBar2.vue";
import chartBar3 from "../components/ExAndInChart.vue";
</script>

<template>
  <div class="flex justify-around"><chartPie /> <chartBar /></div>
  <div class="mt-5">
    <chartBar2 />
    <chartBar3 />
  </div>
</template>
