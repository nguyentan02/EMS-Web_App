<template>
  <div class="card flex justify-center">
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
      class="w-[500px]"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Chart from "primevue/chart";
import { usemaintenanceStore } from "../stores/maintenance.store";

const maintenanceStore = usemaintenanceStore();
const maintenances = ref(null);
const results = ref([]);
const label = ref([]);
const deviceCate = ref([]);
onMounted(async () => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  maintenances.value = await maintenanceStore.getStatus();
  console.log(maintenances.value);
  label.value = maintenances.value.map((element) => element.value);
});
const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: ["Hoàn thành bảo trì", "Đang bảo trì", "Trễ hạn"],
    datasets: [
      {
        data: label,
        backgroundColor: [
          "RGBA( 210, 105, 30, 1 )",
          "RGBA( 255, 127, 80, 1 )",
          "RGBA( 100, 149, 237, 1 )",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    plugins: {
      legend: {
        display: false,
        labels: {
          generateLabels: function (chart) {
            return [];
          },
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
