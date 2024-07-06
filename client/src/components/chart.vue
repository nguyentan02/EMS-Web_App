<template>
  <div class="card flex justify-center">
    <Chart
      type="pie"
      :data="chartData"
      :options="chartOptions"
      class="md:w-[20rem]"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Chart from "primevue/chart";
import { cateStore } from "@/stores/category.store";

const useCateStore = cateStore();
const cates = ref();
const devices = ref([]);
const label = ref([]);
const deviceCate = ref([]);
onMounted(async () => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  devices.value = await useCateStore.getDataChart();

  label.value = devices.value.map((item) => item.name);
  deviceCate.value = devices.value.map((item) => item.Devices.length);
});
const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: label,
    datasets: [
      {
        data: deviceCate,
        backgroundColor: [
          "RGBA( 250, 235, 215, 1 )",
          "RGBA( 0, 255, 255, 1 )",
          "RGBA( 127, 255, 212, 1 )",
          "RGBA( 240, 255, 255, 1 )",
          "RGBA( 245, 245, 220, 1 )",
          "RGBA( 0, 0, 0, 1 )",
          "RGBA( 0, 0, 255, 1 )",
          "RGBA( 138, 43, 226, 1 )",
          "RGBA( 165, 42, 42, 1 )",
          "RGBA( 222, 184, 135, 1 )",
          "RGBA( 95, 158, 160, 1 )",
          "RGBA( 127, 255, 0, 1 )",
          "RGBA( 210, 105, 30, 1 )",
          "RGBA( 255, 127, 80, 1 )",
          "RGBA( 100, 149, 237, 1 )",
          "RGBA( 255, 248, 220, 1 )",
          "RGBA( 220, 20, 60, 1 )",
          "RGBA( 0, 255, 255, 1 )",
          "RGBA( 0, 0, 139, 1)",
        ],
        // hoverBackgroundColor: [
        //   documentStyle.getPropertyValue("--p-cyan-400"),
        //   documentStyle.getPropertyValue("--p-orange-400"),
        //   documentStyle.getPropertyValue("--p-gray-400"),
        // ],
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
      title: {
        display: true,
        text: "Thống kê thiết bị theo phân loại",
        position: "bottom",
        padding: {
          top: 20,
        },
      },
    },
  };
};
</script>
