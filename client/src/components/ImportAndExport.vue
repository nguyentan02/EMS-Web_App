<script setup>
import { useTransaction } from "@/stores/transaction.store";
import { ref, onMounted, reactive, watch } from "vue";
import {
  FwbButton,
  FwbModal,
  FwbInput,
  FwbSelect,
  FwbToast,
  FwbBadge,
} from "flowbite-vue";
const props = defineProps({
  materialId: {
    type: Number,
    required: true,
  },
});
const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
import dayjs from "dayjs";

const transactionStore = useTransaction();
const trans = ref([]);
const fill = ref([]);
const Export = ref();
const filterType = () => {
  fill.value = trans.value.filter((item) => item.transactionType === "Nhập");
  Export.value = trans.value.filter((item) => item.transactionType !== "Nhập");
};
watch(
  () => props.materialId,
  async (newOrderId) => {
    trans.value = await transactionStore.getTransaction(newOrderId);
    filterType();
  }
);

onMounted(async () => {
  console.log(props.materialId);
  trans.value = await transactionStore.getTransaction(props.materialId);
  filterType();
});
</script>
<template>
  <fwb-modal size="4xl" @close="$emit('close')">
    <template #header>
      <div class="flex items-center text-lg">
        Lịch sử nhập xuất của #{{ trans[0]?.material.name }}
      </div>
    </template>
    <template #body>
      <p class="py-3">Lịch sử nhập</p>
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th class="text-center border px-4">STT</th>
            <th class="text-center border px-4">ID</th>
            <th class="text-center border px-4">Đơn vị</th>
            <th class="text-center border px-4">Số lượng</th>
            <th class="text-center border px-4">Giá</th>
            <th class="text-center border px-4">Ngày nhận hàng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(orderItem, i) in fill" :key="orderItem.id">
            <td class="text-center border">{{ i + 1 }}</td>
            <td class="text-center font-medium text-gray-900 border">
              {{ orderItem.material.id }} - {{ orderItem.material.name }}
            </td>
            <td class="text-center border">
              {{ orderItem.material.unit }}
            </td>
            <td class="text-center border">
              {{ orderItem.quantity }}
            </td>
            <td class="text-center border">
              {{ formatCurrency(orderItem.price) }}
            </td>
            <td class="text-center border">
              {{
                dayjs(orderItem.transactionDate).format("DD/MM/YYYY HH:MM:ss")
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <p class="py-3">Lịch sử xuất</p>
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th class="text-center border px-4">STT</th>
            <th class="text-center border px-4">ID-Tên vật tư</th>
            <th class="text-center border px-4">Đơn vị</th>
            <th class="text-center border px-4">Số lượng</th>
            <th class="text-center border px-4">Lý do xuất</th>
            <th class="text-center border px-4">Ngày xuất</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(orderItem, i) in Export" :key="orderItem.id">
            <td class="text-center border">{{ i + 1 }}</td>
            <td class="text-center font-medium text-gray-900 border">
              {{ orderItem.material.id }} - {{ orderItem.material.name }}
            </td>
            <td class="text-center border">
              {{ orderItem.material.unit }}
            </td>
            <td class="text-center border">
              {{ orderItem.quantity }}
            </td>
            <td class="text-center border">
              <p v-if="orderItem.transactionType === 'Xuất'">
                Bảo trì sửa chữa
              </p>
              <p v-else>Hoàn lại khi bảo trì</p>
            </td>
            <td class="text-center border">
              {{
                dayjs(orderItem.transactionDate).format("DD/MM/YYYY HH:MM:ss")
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </fwb-modal>
</template>
