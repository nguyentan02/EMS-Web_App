<script setup>
import { orderStore } from "@/stores/order.store";
import { ref, onMounted, reactive, watch, computed } from "vue";
import ExAndIm from "../components/ImportAndExport.vue";
const useOrderStore = orderStore();

const selectedOrderId = ref(null);
const showDetailModal1 = ref(false);
function openDetailModal(id) {
  selectedOrderId.value = id;
  showDetailModal1.value = true;
}
const materials = ref();
onMounted(async () => {
  materials.value = await useOrderStore.getMaterialQuantity();
});
</script>
<template>
  <h1 class="text-xl font-bold pl-4 mb-4">Kho vật tư</h1>

  <div v-if="!materials || materials.length === 0" class="text-center py-4">
    <p>Không có thiết bị nào</p>
  </div>
  <table v-else class="w-full text-sm text-left text-gray-700">
    <thead class="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th class="text-center border px-4 py-3">STT</th>
        <th class="text-center border px-4 py-3">Tên Vật Liệu</th>
        <th class="text-center border px-4 py-3">Hình Ảnh</th>
        <th class="text-center border px-4 py-3">Đơn vị</th>
        <th class="text-center border px-4 py-3">Số lượng</th>
        <th class="text-center border px-4 py-3">Xem lịch sử nhập,xuất</th>
      </tr>
    </thead>
    <tbody v-for="(material, i) in materials" :key="material.id">
      <tr class="">
        <td class="text-center border">{{ i + 1 }}</td>
        <td class="text-center font-medium text-gray-900 border">
          {{ material.name }}
        </td>
        <td class="text-center border">
          <div class="flex justify-center">
            <img
              :src="material.imageUrl"
              alt="image"
              class="h-[50px] w-[50px]"
            />
          </div>
        </td>
        <td class="text-center border">
          {{ material.unit }}
        </td>

        <td class="text-center border">
          {{ material.totalQuantity }}
        </td>
        <td class="text-center border">
          <span
            @click="openDetailModal(material.materialId)"
            class="flex justify-center cursor-pointer"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 hover:opacity-25"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
  <ExAndIm
    v-if="showDetailModal1"
    :materialId="selectedOrderId"
    @close="showDetailModal1 = false"
  />
</template>
