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
  FwbPagination,
} from "flowbite-vue";

import OrderDetail from "../components/OrderDetail.vue";
import OrderItem from "../components/OrderItem.vue";
import dayjs from "dayjs";
const useOrderStore = orderStore();
const orders = ref();

onMounted(async () => {
  orders.value = await useOrderStore.getOrderMater();
});

const showOrderItemModal = ref(false);
function openOrderItemModal() {
  showOrderItemModal.value = true;
}
function closeOrderItemModal() {
  showOrderItemModal.value = false;
}
const selectedOrderId = ref(null);
const showDetailModal = ref(false);
function openDetailModal(orderId) {
  selectedOrderId.value = orderId;
  showDetailModal.value = true;
}

const updateOrder = async (orderId) => {
  await useOrderStore.updateOrder(orderId);
  orders.value = await useOrderStore.getOrderMater();
  console.log(orderId);
};
const refreshOrders = async () => {
  orders.value = await useOrderStore.getOrderMater();
};
</script>
<template>
  <div class="flex justify-between items-center pt-3 pb-3">
    <h1 class="text-xl font-bold pl-4">Danh sách đơn hàng</h1>
    <div class="card flex justify-content-center">
      <fwb-button @click="openOrderItemModal">Đặt hàng</fwb-button>
      <OrderItem
        v-if="showOrderItemModal"
        @close="showOrderItemModal = false"
        @order-created="
          () => {
            closeOrderItemModal();
            refreshOrders();
          }
        "
      />
    </div>
  </div>
  <div v-if="!orders || orders.length === 0" class="text-center py-4">
    <p>Không có thiết bị nào</p>
  </div>

  <table v-else class="w-full text-sm text-left text-gray-700">
    <thead class="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th class="text-center border px-4 py-3">STT</th>
        <th class="text-center border px-4 py-3">ID Đơn hàng</th>
        <th class="text-center border px-4 py-3">Ngày mua</th>
        <th class="text-center border px-4 py-3">Trạng thái</th>
        <th class="text-center border px-4 py-3">Hành động</th>
        <th class="text-center border px-4 py-3"></th>
      </tr>
    </thead>
    <tbody v-for="(order, i) in orders" :key="order.id">
      <tr class="">
        <td class="text-center border">{{ i + 1 }}</td>
        <td class="text-center font-medium text-gray-900 border">
          {{ order.id }}
        </td>
        <td class="text-center border">
          {{ dayjs(order.orderDate).format("DD/MM/YYYY HH:MM:ss") }}
        </td>
        <td class="text-center border">
          <div class="flex justify-between">
            <fwb-badge
              v-if="order.status === 'pending'"
              type="red"
              class="w-[90px] ml-2 my-2"
              >Đang chờ nhận hàng</fwb-badge
            >
            <fwb-badge v-else type="green" class="w-[90px] ml-2 my-2"
              >Đã nhận hàng</fwb-badge
            >
          </div>
        </td>

        <td class="text-center border">
          <fwb-button
            size="xs"
            gradient="teal"
            @click="updateOrder(order.id)"
            :disabled="order.status === 'delivered'"
            >Đã nhận</fwb-button
          >
        </td>
        <td class="text-center border">
          <fwb-button
            size="xs"
            color="blue"
            outline
            @click="openDetailModal(order.id)"
            >Xem chi tiết</fwb-button
          >
        </td>
      </tr>
    </tbody>
  </table>
  <OrderDetail
    v-if="showDetailModal"
    :orderId="selectedOrderId"
    @close="showDetailModal = false"
  />
</template>
