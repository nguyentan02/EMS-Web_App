<script setup>
import chartPie from "../components/chart.vue";
import chartBar from "../components/chartBar.vue";
import chartBar2 from "../components/chartBar2.vue";
import chartBar3 from "../components/ExAndInChart.vue";
</script>

<template>
  <!-- <div class="wrapper">
    <svg>
      <text x="30%" y="20%" dy=".25em" text-anchor="middle">
        Biểu đồ thống kê dữ liệu
      </text>
    </svg>
  </div> -->
  <h1 class="font-bold mb-4 text-xl pl-4">Biểu đồ thống kê dữ liệu</h1>
  <div class="flex mx-2 my-5"><chartPie /> <chartBar class="ml-[50px]" /></div>
  <div class="flex mx-2"><chartBar2 /> <chartBar3 class="ml-[50px]" /></div>
</template>
