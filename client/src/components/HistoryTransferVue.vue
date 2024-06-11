<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { deviceStore } from "../stores/devices.store";

import SearchForm from "../components/SearchForm.vue";
import { roomStore } from "@/stores/room.store";
import { cateStore } from "@/stores/category.store";
import { FwbButton, FwbModal, FwbInput, FwbSelect } from "flowbite-vue";
import { useToast } from "vue-toast-notification";

import dayjs from "dayjs";

const useHistoryStore = deviceStore();
const useRoomStore = roomStore();
const useCateStore = cateStore();
const historys = ref();
const rooms = ref();
const cates = ref();
const $toast = useToast();
onMounted(async () => {
  historys.value = await useHistoryStore.getHistoryTrans();
});
</script>
<template>
  <div class="flex justify-between items-center pt-3 pb-3">
    <h1 class="text-xl font-bold pl-4">Danh sách thiết bị</h1>
  </div>
  <hr />
  <div class="flex justify-between">
    <SearchForm />
  </div>

  <table class="w-full text-sm text-left text-gray-700">
    <thead class="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th class="text-center border px-4 py-3">STT</th>
        <th class="text-center border px-4 py-3">Tên Thiết Bị</th>
        <th class="text-center border px-4 py-3">Model</th>
        <th class="text-center border px-4 py-3">Số seri</th>

        <th class="text-center border px-4 py-3">Trạng thái</th>
        <th class="text-center border px-4 py-3">Phòng / Khoa Cũ</th>
        <th class="text-center border px-4 py-3">Phòng / Khoa Mới</th>
        <th class="text-center border px-4 py-3">
          <span class="">Thời gian luân chuyển</span>
        </th>
      </tr>
    </thead>
    <tbody v-for="(history, i) in historys" :key="history.id">
      <tr class="">
        <td class="text-center border">{{ i + 1 }}</td>
        <td class="px-3 py-3 font-medium text-gray-900 border">
          {{ history.Device.name }}
        </td>
        <td class="text-center border">{{ history.Device.model }}</td>
        <td class="text-center border">{{ history.Device.serial_number }}</td>
        <td class="text-center border">
          <p>Không hoạt động</p>
        </td>

        <td class="text-center border">
          {{ history.OldRoom.room_name }} /
          {{ history.OldRoom.deparment.deparment_name }}
        </td>
        <td class="text-center border">
          {{ history.NewRoom.room_name }} /
          {{ history.NewRoom.deparment.deparment_name }}
        </td>
        <td class="text-center border">
          {{ dayjs(history.transferDate).format("DD/MM/YYYY HH:mm:ss") }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
