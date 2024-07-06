<template>
  <div class="card flex justify-center">
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
      class="md:w-[25rem] h-[200px]"
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
          "rgba(38, 191, 49, 0.95)",
          "rgba(252, 170, 38, 0.95)",
          "rgba(233, 53, 25, 0.95)",
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
      title: {
        display: true,
        text: "Thống kê tình trạng bảo trì,sửa chữa",
        position: "bottom",
        padding: {
          top: 20,
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
