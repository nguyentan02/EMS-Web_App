<template>
  <div class="card flex justify-center">
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-[50rem]"
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
        label: "Số lượng thiết bị",
        data: deviceCate,
        backgroundColor: ["RGBA( 250, 235, 215, 1 )"],
        borderWidth: 1,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>
