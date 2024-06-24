<script setup>
import { orderStore } from "@/stores/order.store";
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
  orderId: {
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
const useOrderStore = orderStore();
const orders = ref();

watch(
  () => props.orderId,
  async (newOrderId) => {
    orders.value = await useOrderStore.getOrderMaterById(newOrderId);
  }
);

onMounted(async () => {
  console.log(props.orderId);
  orders.value = await useOrderStore.getOrderMaterById(props.orderId);
  console.log(orders.value);
});
</script>
<template>
  <fwb-modal @close="$emit('close')">
    <template #header>
      <div class="flex items-center text-lg">
        Chi tiết đơn hàng #{{ orders?.id }}
      </div>
    </template>
    <template #body>
      <form>
        <div class="flex">
          <div class="flex align-items-center gap-3 mb-3 mr-3">
            <p class="font-semibold">ID Đơn hàng:</p>
          </div>
          <div class="flex align-items-center gap-3 mb-3">{{ orders?.id }}</div>
        </div>
        <div class="flex align-items-center gap-3 mb-3">
          <p class="font-semibold">Ngày đặt hàng:</p>
          {{ dayjs(orders?.orderDate).format("DD/MM/YYYY HH:MM:ss") }}
        </div>
        <div
          v-if="orders?.orderDateEnd !== null"
          class="flex align-items-center gap-3 mb-3"
        >
          <p class="font-semibold">Ngày nhận hàng:</p>
          {{ dayjs(orders?.orderDateEnd).format("DD/MM/YYYY HH:MM:ss") }}
        </div>
        <table class="w-full text-sm text-left text-gray-700">
          <thead class="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th class="text-center border px-4 py-3">STT</th>
              <th class="text-center border px-4 py-3">Tên Vật Liệu</th>
              <th class="text-center border px-4 py-3">Hình Ảnh</th>
              <th class="text-center border px-4 py-3">Đơn vị</th>
              <th class="text-center border px-4 py-3">Số lượng</th>
              <th class="text-center border px-4 py-3">Giá</th>
            </tr>
          </thead>
          <tbody v-for="(material, i) in orders?.orderItems" :key="material.id">
            <tr class="">
              <td class="text-center border">{{ i + 1 }}</td>
              <td class="text-center font-medium text-gray-900 border">
                {{ material.material.name }}
              </td>
              <td class="text-center border">
                <div class="flex justify-center">
                  <img
                    :src="material.material.imageUrl"
                    alt="image"
                    class="h-[50px] w-[50px]"
                  />
                </div>
              </td>
              <td class="text-center border">
                {{ material.material.unit }}
              </td>
              <td class="text-center border">
                {{ material.quantity }}
              </td>
              <td class="text-center border">
                {{ material.price }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex align-items-center gap-3 mb-3">
          <p class="font-semibold">
            Tổng tiền: {{ formatCurrency(orders?.totalPrice) }}
          </p>
        </div>
        <div class="flex align-items-center gap-3 mb-3"></div>
      </form>
    </template>
  </fwb-modal>
</template>
