<template>
  <div class="card">
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
      class="h-[30rem]"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import { useTransaction } from "@/stores/transaction.store";
const transactionStore = useTransaction();
const trans = ref([]);
const label = ref([]);
const imports = ref([]);
const exprots = ref([]);
onMounted(async () => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  trans.value = await transactionStore.getAll();
  console.log(trans.value);
  label.value = trans.value.map((item) => item.name);
  imports.value = trans.value.map((item) => item.nhap);
  exprots.value = trans.value.map((item) => item.xuat);
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: label,
    datasets: [
      {
        label: "Số lượng nhập",
        backgroundColor: documentStyle.getPropertyValue("--p-cyan-500"),
        borderColor: documentStyle.getPropertyValue("--p-cyan-500"),
        data: imports,
      },
      {
        label: "Số lượng xuất",
        backgroundColor: documentStyle.getPropertyValue("--p-gray-500"),
        borderColor: documentStyle.getPropertyValue("--p-gray-500"),
        data: exprots,
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
    maintainAspectRatio: false,
    aspectRatio: 0.8,
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
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
};
</script>
