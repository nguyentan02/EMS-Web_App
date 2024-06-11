<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { deviceStore } from "../stores/devices.store";

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
const useRoomStore = roomStore();
const useCateStore = cateStore();
const devices = ref();
const rooms = ref();
const cates = ref();
const $toast = useToast();
onMounted(async () => {
  devices.value = await useDeviceStore.getAllDevices();
  console.log(devices.value);
  rooms.value = await useRoomStore.getRooms();
  cates.value = await useCateStore.getCate();
});

const isShowModal = ref(false);
function closeModal() {
  isShowModal.value = false;
}

function showModal() {
  isShowModal.value = true;
}

const editDevices = reactive({
  id: "",
  locationId: "",
});
const selected = ref();
const cateselect = ref();
const creDevice = reactive({
  name: "",
  model: "",
  serial: "",
  manufac: "",
  category_id: "",
  purchase: "",
  price: "",
  locationId: "",
});
watch(selected, (newValue) => {
  editDevices.locationId = newValue;
});
watch(cateselect, (newValue) => {
  creDevice.category_id = newValue;
});
const updateDevice = async () => {
  console.log(editDevices);
  await useDeviceStore.tranferDevice(editDevices);
  closeModal();
  devices.value = await useDeviceStore.getAllDevices();
  selected.value = "";
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
    <tbody v-for="(device, i) in devices" :key="device.id">
      <tr class="">
        <td class="text-center border">{{ i + 1 }}</td>
        <td class="px-3 py-3 font-medium text-gray-900 border">
          {{ device.name }}
        </td>
        <td class="text-center border">
          {{ device.model }}
        </td>
        <td class="text-center border">
          {{ device.serial_number }}
        </td>
        <td class="text-center border">
          <fwb-badge
            v-if="device.statusId === 1"
            type="dark"
            class="w-[90px] ml-2"
            >Không hoạt động</fwb-badge
          >
          <fwb-badge
            v-else="device.statusId === 3"
            type="yellow"
            class="w-[90px] ml-2"
            >Cần được bảo trì</fwb-badge
          >
        </td>

        <td class="text-center border">
          {{ device.Room.room_name }}/{{ device.Room.deparment.deparment_name }}
        </td>
        <td class="text-center border">{{ device.Category.name }}</td>
        <td class="text-center border">
          <fwb-button
            @click="
              () => {
                editDevices.id = device.id;
                editDevices.name = device.name;
                editDevices.model = device.model;
                editDevices.serial = device.serial_number;
                editDevices.room = device.Room.room_name;
                editDevices.depar = device.Room.deparment.deparment_name;
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
