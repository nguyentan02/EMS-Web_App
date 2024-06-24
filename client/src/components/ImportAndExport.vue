<script setup>
import { materialStore } from "../stores/material.store";
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
const useMaterialStore = materialStore();
const trans = ref();

watch(
  () => props.materialId,
  async (newOrderId) => {
    trans.value = await useMaterialStore.getMaterialById(newOrderId);
  }
);

onMounted(async () => {
  console.log(props.materialId);
  trans.value = await useMaterialStore.getMaterialById(props.materialId);
  console.log(trans.value);
});
</script>
<template>
  <fwb-modal size="4xl" @close="$emit('close')">
    <template #header>
      <div class="flex items-center text-lg">
        Lịch sử nhập xuất của #{{ trans?.name }}
      </div>
    </template>
    <template #body>
      <form>
        <table class="w-full text-sm text-left text-gray-700">
          <thead class="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th class="text-center border px-4 py-3">STT</th>
              <th class="text-center border px-4 py-3">Tên Vật Liệu</th>
              <th class="text-center border px-4 py-3">Hình Ảnh</th>
              <th class="text-center border px-4 py-3">Đơn vị</th>
              <th class="text-center border px-4 py-3">Số lượng</th>
              <th class="text-center border px-4 py-3">Giá</th>
              <th class="text-center border px-4 py-3">Ngày đặt hàng</th>
              <th class="text-center border px-4 py-3">Ngày nhận hàng</th>
              <th class="text-center border px-4 py-3">Tổng tiền</th>
            </tr>
          </thead>
          <tbody
            v-for="(orderItem, i) in trans?.orderItems"
            :key="orderItem.id"
          >
            <tr class="">
              <td class="text-center border">{{ i + 1 }}</td>
              <td class="text-center font-medium text-gray-900 border">
                {{ orderItem.material.name }}
              </td>
              <td class="text-center border">
                <div class="flex justify-center">
                  <img
                    :src="orderItem.material.imageUrl"
                    alt="image"
                    class="h-[50px] w-[50px]"
                  />
                </div>
              </td>
              <td class="text-center border">
                {{ orderItem.material.unit }}
              </td>
              <td class="text-center border">
                {{ orderItem.quantity }}
              </td>
              <td class="text-center border">
                {{ orderItem.price }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex align-items-center gap-3 mb-3"></div>
      </form>
    </template>
  </fwb-modal>
</template>
