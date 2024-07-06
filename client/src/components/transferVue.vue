<script setup>
import { ref, onMounted, reactive, watch, computed } from "vue";
import { deviceStore } from "../stores/devices.store";
import { usageStore } from "@/stores/usage.store";

import SearchForm from "../components/SearchForm.vue";
import { roomStore } from "@/stores/room.store";
import { cateStore } from "@/stores/category.store";
import {
  FwbButton,
  FwbModal,
  FwbInput,
  FwbSelect,
  FwbBadge,
} from "flowbite-vue";
import { useToast } from "vue-toast-notification";

import dayjs from "dayjs";

const useDeviceStore = deviceStore();
const useUsageStore = usageStore();

const useRoomStore = roomStore();
const useCateStore = cateStore();
const devices = ref();
const rooms = ref();
const cates = ref();
const allDeparments = ref();
const deparments = ref();
const $toast = useToast();
onMounted(async () => {
  devices.value = await useUsageStore.getAllUsages();
  console.log(devices.value);
  // rooms.value = await useRoomStore.getRooms();
  allDeparments.value = await useRoomStore.getDeparment();
  deparments.value = allDeparments.value
    .filter((dep) => dep.id !== 10)
    .map((dep) => ({
      value: dep.id,
      name: dep.deparment_name,
    }));
  cates.value = await useCateStore.getCate();
});
const filteredDevices = computed(() => {
  return (
    devices.value?.filter(
      (device) => device.statusId !== 1 && device.roomId !== 10
    ) ?? []
  );
});
const isShowModal = ref(false);
function closeModal() {
  isShowModal.value = false;
}

function showModal() {
  isShowModal.value = true;
}

const editDevices = reactive({
  deviceId: "",
  // id: "",
  locationId: "",
});
const selected = ref();
const depselect = ref();
watch(selected, (newValue) => {
  editDevices.locationId = newValue;
});
watch(depselect, (newValue) => {
  const selectedDepartment = allDeparments.value.find(
    (dep) => dep.id === newValue
  );
  rooms.value = selectedDepartment
    ? selectedDepartment.rooms.map((room) => ({
        value: room.id,
        name: room.room_name,
      }))
    : [];
});

const updateDevice = async () => {
  await useDeviceStore.tranferDevice(editDevices);
  if (useDeviceStore.err) {
    $toast.error(useDeviceStore.err, { position: "top-right" });
    return;
  }
  $toast.success(useDeviceStore.result.message, {
    position: "top-right",
  });
  closeModal();
  devices.value = await useUsageStore.getAllUsages();
  selected.value = "";
  depselect.value = "";
};
</script>
<template>
  <div class="flex justify-between items-center pt-3 pb-3">
    <h1 class="text-xl font-bold pl-4">Danh sách thiết bị</h1>
  </div>
  <hr />
  <div class="flex justify-between">
    <SearchForm />
    <div class="flex align-items-center gap-3 mb-3">
      <fwb-select v-model="selected" :options="rooms" />
    </div>
  </div>

  <table class="w-full text-sm text-left text-gray-700">
    <thead class="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th class="text-center border px-4 py-3">STT</th>
        <th class="text-center border px-4 py-3">Tên Thiết Bị</th>
        <th class="text-center border px-4 py-3">Model</th>
        <th class="text-center border px-4 py-3">Số seri</th>

        <th class="text-center border px-4 py-3">Trạng thái</th>
        <th class="text-center border px-4 py-3">Phòng / Khoa</th>
        <th class="text-center border px-4 py-3">Loại thiết bị</th>
        <th class="text-center border px-4 py-3">
          <span class="">Hành động</span>
        </th>
      </tr>
    </thead>
    <tbody v-for="(device, i) in filteredDevices" :key="device.id">
      <tr class="">
        <td class="text-center border">{{ i + 1 }}</td>
        <td class="px-3 py-3 font-medium text-gray-900 border">
          {{ device.Device.name }}
        </td>
        <td class="text-center border">
          {{ device.Device.model }}
        </td>
        <td class="text-center border">
          {{ device.Device.serial_number }}
        </td>
        <td class="text-center border">
          <fwb-badge
            v-if="device.Device.statusId === 2"
            type="green"
            class="w-[90px] ml-2"
            >Đang hoạt động</fwb-badge
          >
          <fwb-badge
            v-else-if="device.Device.statusId === 4"
            type="yellow"
            class="w-[90px] ml-2"
            >Đang bảo trì</fwb-badge
          >
          <fwb-badge
            v-else="device.Device.statusId === 6"
            type="red"
            class="w-[90px] ml-2"
            >Quá hạn sử dụng</fwb-badge
          >
        </td>

        <td class="text-center border">
          {{ device.Device.Room.room_name }}/{{
            device.Device.Room.deparment.deparment_name
          }}
        </td>
        <td class="text-center border">{{ device.Device.Category.name }}</td>
        <td class="text-center border">
          <fwb-button
            @click="
              () => {
                // editDevices.id = device.id;
                editDevices.deviceId = device.deviceId;
                editDevices.name = device.Device.name;
                editDevices.model = device.Device.model;
                editDevices.serial = device.Device.serial_number;
                editDevices.room = device.Device.Room.room_name;
                editDevices.depar = device.Device.Room.deparment.deparment_name;
                showModal();
              }
            "
            color="green"
            size="sm"
            class="mr-2"
            >Chuyển</fwb-button
          >
          <fwb-modal size="xs" v-if="isShowModal" @close="closeModal">
            <template #header>
              <div class="flex items-center text-lg">Luân chuyển</div>
            </template>
            <template #body>
              <form>
                <div class="flex align-items-center gap-3 mb-3 mr-3">
                  <label for="name" class="font-semibold w-6rem"
                    >Tên thiết bị:</label
                  >
                  <p>{{ editDevices.name }}</p>
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                  <label for="model" class="font-semibold w-6rem mr-9"
                    >Model:</label
                  >
                  <p>{{ editDevices.model }}</p>
                </div>

                <div class="flex align-items-center gap-3 mb-3">
                  <label for="name" class="font-semibold w-6rem mr-9"
                    >Serial:</label
                  >
                  <p>{{ editDevices.serial }}</p>
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                  <label for="name" class="font-semibold w-6rem mr-9"
                    >Phòng:</label
                  >
                  <p>
                    {{ editDevices.room }}
                  </p>
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                  <label for="name" class="font-semibold w-6rem mr-9"
                    >Khoa:</label
                  >
                  <p>
                    {{ editDevices.depar }}
                  </p>
                </div>
                <div class="flex align-items-center gap-3 mb-3 mr-3">
                  <fwb-select
                    v-model="depselect"
                    :options="deparments"
                    label="Khoa"
                  />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                  <fwb-select
                    v-model="selected"
                    :options="rooms"
                    label="Chọn phòng"
                  />
                </div>
              </form>
            </template>
            <template #footer>
              <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                  Trở về
                </fwb-button>
                <fwb-button @click="updateDevice" color="green">
                  Luân chuyển
                </fwb-button>
              </div>
            </template>
          </fwb-modal>
        </td>
      </tr>
    </tbody>
  </table>
</template>
