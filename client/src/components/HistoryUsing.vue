<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { deviceStore } from "../stores/devices.store";
import { usageStore } from "@/stores/usage.store";
import SearchForm from "../components/SearchForm.vue";
import { roomStore } from "@/stores/room.store";
import {
  FwbButton,
  FwbModal,
  FwbTextarea,
  FwbSelect,
  FwbBadge,
  FwbPagination,
} from "flowbite-vue";
import { useToast } from "vue-toast-notification";
import SelectDevice from "@/components/test3.vue";

import dayjs from "dayjs";

const useDeviceStore = deviceStore();
const useRoomStore = roomStore();
const useUsageStore = usageStore();
const devices = ref();
const usages = ref();
const rooms = ref();
const allDeparments = ref();
const deparments = ref();
const $toast = useToast();

const currentPage = ref(1);
onMounted(async () => {
  usages.value = await useUsageStore.getAllUsagesTrue();
  console.log(usages.value);
  allDeparments.value = await useRoomStore.getDeparment();
  deparments.value = allDeparments.value
    .filter((dep) => dep.id !== 10)
    .map((dep) => ({
      value: dep.id,
      name: dep.deparment_name,
    }));
  deparments.value.unshift({ value: "all", name: "Tất cả" });
  applyFilters();
});

const selectedDepartment = ref("");
const selectedRoom = ref("");
const filteredUsages = ref([]);
watch(selectedDepartment, (newValue) => {
  if (newValue === "all") {
    rooms.value = [];
    selectedRoom.value = null;
  } else {
    const department = allDeparments.value.find((dep) => dep.id === newValue);
    rooms.value = [{ value: "all", name: "Tất cả phòng" }].concat(
      department
        ? department.rooms.map((room) => ({
            value: room.id,
            name: room.room_name,
          }))
        : []
    );
  }
  applyFilters();
});

// Watch changes in selectedRoom and apply filters
watch(selectedRoom, () => {
  applyFilters();
});
function applyFilters() {
  filteredUsages.value = usages.value.filter((usage) => {
    const roomMatches =
      selectedRoom.value === "all" ||
      !selectedRoom.value ||
      usage.Device.Room.id === selectedRoom.value;
    const departmentMatches =
      selectedDepartment.value === "all" ||
      !selectedDepartment.value ||
      usage.Device.Room.deparment_id === selectedDepartment.value;
    return roomMatches && departmentMatches;
  });
}
</script>
<template>
  <div class="flex justify-between items-center pt-3 pb-3">
    <h1 class="text-xl font-bold pl-4">Lịch sử sử dụng của các thiết bị</h1>
  </div>

  <hr />
  <div class="flex justify-between my-3">
    <SearchForm />
    <div class="flex mb-2">
      <fwb-select
        v-model="selectedDepartment"
        :options="deparments"
        label="Khoa"
        class="mr-2"
        placeholder="Chọn khoa"
      />
      <fwb-select
        v-model="selectedRoom"
        :options="rooms"
        label="Phòng"
        placeholder="Chọn phòng"
      />
    </div>
  </div>

  <div
    v-if="!filteredUsages || filteredUsages.length === 0"
    class="text-center py-4"
  >
    <p>Không có thiết bị nào đang được sử dụng</p>
  </div>

  <table v-else class="table-auto text-sm text-left text-gray-700">
    <thead class="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th class="text-center border px-4 py-3">STT</th>
        <th class="text-center border px-4 py-3">Tên Thiết Bị</th>
        <!-- <th class="text-center border px-4 py-3">Model</th> -->
        <th class="text-center border px-4 py-3">Số seri</th>
        <!-- <th class="text-center border px-4 py-3">Trạng thái</th> -->
        <th class="text-center border px-4 py-3">Loại thiết bị</th>
        <th class="text-center border px-4 py-3">Phòng / Khoa</th>
        <th class="text-center border px-4 py-3">Người sử dụng</th>
        <th class="text-center border px-4 py-3">Ngày bắt đầu</th>
        <th class="text-center border px-4 py-3">Ngày dừng hoạt dộng</th>
        <!-- <th class="text-center border px-4 py-3">
          <span class="">Hành động</span>
        </th> -->
      </tr>
    </thead>
    <tbody v-for="(usage, i) in filteredUsages" :key="usage.id">
      <tr class="">
        <td class="text-center border">{{ i + 1 }}</td>
        <td class="px-3 py-3 font-medium text-gray-900 border">
          {{ usage.Device.name }}
        </td>
        <td class="text-center border">
          {{ usage.Device.serial_number }}
        </td>
        <!-- <td class="text-center border">
          <fwb-badge
            v-if="usage.Device.statusId === 2"
            type="green"
            class="w-[90px] ml-2"
            >Đang hoạt động</fwb-badge
          >
          <fwb-badge
            v-else="usage.Device.statusId === 3"
            type="yellow"
            class="w-[90px] ml-2"
            >Cần bảo trì</fwb-badge
          >
        </td> -->
        <td class="text-center border">
          {{ usage.Device.Category.name }}
        </td>
        <td class="text-center border">
          {{ usage.Device.Room.room_name }} /
          {{ usage.Device.Room.deparment.deparment_name }}
        </td>
        <td class="text-center border">
          {{ usage.user }}
        </td>
        <td class="text-center border">
          {{ dayjs(usage.usage_start).format("DD/MM/YYYY") }}
        </td>
        <td v-if="usage.end === null" class="text-center border">
          Đang hoạt động
        </td>
        <td v-else class="text-center border">
          {{ dayjs(usage.end).format("DD/MM/YYYY") }}
        </td>
        <td class="text-center border"></td>
      </tr>
    </tbody>
  </table>
  <fwb-pagination v-model="currentPage" :total-items="100"></fwb-pagination>
</template>
