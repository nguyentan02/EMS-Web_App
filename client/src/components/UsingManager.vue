<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { deviceStore } from "../stores/devices.store";
import { usageStore } from "@/stores/usage.store";
import SearchForm from "../components/SearchForm.vue";
import { roomStore } from "@/stores/room.store";
import { cateStore } from "@/stores/category.store";
import { FwbButton, FwbModal, FwbInput, FwbSelect } from "flowbite-vue";
import { useToast } from "vue-toast-notification";

import dayjs from "dayjs";

const visible = ref(false);
const useDeviceStore = deviceStore();
const useRoomStore = roomStore();
const useCateStore = cateStore();
const useUsageStore = usageStore();
const devices = ref();
const usages = ref();
const rooms = ref();
const cates = ref();
const $toast = useToast();
onMounted(async () => {
  devices.value = await useDeviceStore.getAllDevices();
  usages.value = await useUsageStore.getAllUsages();
  console.log(usages.value);
  rooms.value = await useRoomStore.getRooms();
  cates.value = await useCateStore.getCate();
});
const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const isShowModal = ref(false);
const isShowModal1 = ref(false);
function closeModal() {
  isShowModal.value = false;
}
function closeModal1() {
  isShowModal1.value = false;
}
function showModal() {
  isShowModal.value = true;
}
function showModal1() {
  isShowModal1.value = true;
}
const editDevices = reactive({
  id: "",
  name: "",
  model: "",
  serial: "",
  purchase: "",
  price: "",
});

const updateDevice = async () => {
  await useDeviceStore.updateDevice(editDevices);
  if (useDeviceStore.err) {
    $toast.error(useDeviceStore.err, { position: "top-right" });
    return;
  }
  $toast.success(useDeviceStore.result.message, {
    position: "top-right",
  });
  closeModal();
  devices.value = await useDeviceStore.getAllDevices();
};

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
  location_id: "",
});
watch(selected, (newValue) => {
  creDevice.location_id = newValue;
});
watch(cateselect, (newValue) => {
  creDevice.category_id = newValue;
});
const createDevice = async () => {
  await useDeviceStore.createDeive(creDevice);
  if (useDeviceStore.err) {
    $toast.error(useDeviceStore.err, { position: "top-right" });
    return;
  }
  $toast.success(useDeviceStore.result.message, {
    position: "top-right",
  });
  closeModal1();
  devices.value = await useDeviceStore.getAllDevices();
  creDevice.name = "";
  creDevice.model = "";
  creDevice.serial = "";
  creDevice.manufac = "";
  creDevice.category_id = "";
  creDevice.purchase = "";
  creDevice.price = "";
  creDevice.location_id = "";
};
</script>
<template>
  <div class="flex justify-between items-center pt-3 pb-3">
    <h1 class="text-xl font-bold pl-4">Danh sách thiết bị đang được sử dụng</h1>

    <div class="card flex justify-content-center">
      <fwb-button @click="showModal1" color="green"
        >Đưa thiết bị vào sử dụng
      </fwb-button>
      <fwb-modal persistent v-if="isShowModal1" @close="closeModal1">
        <template #header>
          <div class="flex items-center text-lg">Terms of Service</div>
        </template>
        <template #body>
          <form>
            <div class="flex items-center">
              <div class="flex align-items-center gap-3 mb-3 mr-3">
                <label for="name" class="font-semibold w-6rem"
                  >Tên thiết bị:</label
                >
                <input v-model="creDevice.name" type="text" class="h-[30px]" />
              </div>
              <div class="flex align-items-center gap-3 mb-3">
                <label for="model" class="font-semibold w-6rem">Model:</label>
                <input
                  v-model="creDevice.model"
                  type="text"
                  class="h-[30px] w-[150px]"
                />
              </div>
            </div>
            <div class="flex items-center">
              <div class="flex align-items-center gap-3 mb-3 mr-5">
                <label for="name" class="font-semibold w-6rem mr-9"
                  >Serial:</label
                >
                <input
                  v-model="creDevice.serial"
                  type="text"
                  class="h-[30px]"
                />
              </div>
              <!-- <div class="flex align-items-center gap-3 mb-3">
                <fwb-select
                  v-model="selected"
                  :options="rooms"
                  label="Chọn nơi đặt thiết bị"
                />
              </div> -->
            </div>
            <div class="flex items-center">
              <div class="flex align-items-center gap-3 mb-3 mr-5">
                <label for="name" class="font-semibold w-6rem mr-14"
                  >Giá:</label
                >
                <input v-model="creDevice.price" type="text" class="h-[30px]" />
              </div>
              <div class="flex align-items-center gap-3 mb-3">
                <fwb-select
                  v-model="cateselect"
                  :options="cates"
                  label="Loại thiết bị"
                />
              </div>
            </div>

            <div class="flex align-items-center gap-3 mb-3">
              <label for="name" class="font-semibold w-6rem mr-2"
                >Nhà sản xuất:</label
              >
              <input v-model="creDevice.manufac" type="text" class="h-[30px]" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
              <label for="name" class="font-semibold w-6rem mr-7"
                >Ngày mua:</label
              >
              <input
                v-model="creDevice.purchase"
                type="date"
                class="h-[30px]"
              />
            </div></form
        ></template>
        <template #footer>
          <div class="flex justify-between">
            <fwb-button @click="closeModal1" color="alternative">
              Trở về
            </fwb-button>
            <fwb-button @click="createDevice" color="green">
              Tạo mới
            </fwb-button>
          </div>
        </template>
      </fwb-modal>
    </div>
  </div>

  <hr />
  <SearchForm />
  <div v-if="!devices || devices.length === 0" class="text-center py-4">
    <p>Không có thiết bị nào</p>
  </div>
  <table v-else class="table-auto text-sm text-left text-gray-700">
    <thead class="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th class="text-center border px-4 py-3">STT</th>
        <th class="text-center border px-4 py-3">Tên Thiết Bị</th>
        <!-- <th class="text-center border px-4 py-3">Model</th> -->
        <th class="text-center border px-4 py-3">Số seri</th>
        <th class="text-center border px-4 py-3">Trạng thái</th>
        <th class="text-center border px-4 py-3">Loại thiết bị</th>
        <th class="text-center border px-4 py-3">Phòng / Khoa</th>
        <th class="text-center border px-4 py-3">Ngày bắt đầu</th>
        <th class="text-center border px-4 py-3">Ngày hết hạn</th>
        <th class="text-center border px-4 py-3">
          <span class="">Hành động</span>
        </th>
      </tr>
    </thead>
    <tbody v-for="(usage, i) in usages" :key="usage.id">
      <tr class="">
        <td class="text-center border">{{ i + 1 }}</td>
        <td class="px-3 py-3 font-medium text-gray-900 border">
          {{ usage.Device.name }}
        </td>
        <!-- <td class="text-center border">
          {{ usage.Device.model }}
        </td> -->
        <td class="text-center border">
          {{ usage.Device.serial_number }}
        </td>
        <td class="text-center border">
          {{ usage.Device.statusId }}
          <!-- {{ new Date(device.purchase_date).toLocaleDateString() }} -->
        </td>
        <td class="text-center border">
          {{ usage.Device.Category.name }}
        </td>
        <td class="text-center border">
          {{ usage.Device.Room.room_name }} /
          {{ usage.Device.Room.deparment.deparment_name }}
        </td>
        <td class="text-center border">
          {{ dayjs(usage.usage_start).format("DD/MM/YYYY HH:mm:ss") }}
        </td>
        <td class="text-center border">
          {{ dayjs(usage.usage_end).format("DD/MM/YYYY HH:mm:ss") }}
        </td>
        <td class="text-center border">
          <fwb-button
            @click="
              () => {
                // editDevices.id = device.id;
                // editDevices.name = device.name;
                // editDevices.model = device.model;
                // editDevices.serial = device.serial_number;
                // editDevices.purchase = dayjs(device.purchase_date).format(
                //   'YYYY-MM-DD'
                // );
                // editDevices.price = device.price;
                showModal();
              }
            "
            color="default"
            size="sm"
            outline
            class="mr-2"
            >Sửa</fwb-button
          >
          <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
              <div class="flex items-center text-lg">
                Nhập thông tin cần sửa
              </div>
            </template>
            <template #body>
              <form>
                <div class="flex">
                  <div class="flex align-items-center gap-3 mb-3 mr-3">
                    <label for="name" class="font-semibold w-6rem"
                      >Tên thiết bị:</label
                    >
                    <input
                      v-model="editDevices.name"
                      type="text"
                      class="h-[30px]"
                    />
                  </div>
                  <div class="flex align-items-center gap-3 mb-3">
                    <label for="model" class="font-semibold w-6rem"
                      >Model:</label
                    >
                    <input
                      v-model="editDevices.model"
                      type="text"
                      class="h-[30px] w-[150px]"
                    />
                  </div>
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                  <label for="name" class="font-semibold w-6rem mr-9"
                    >Serial:</label
                  >
                  <input
                    v-model="editDevices.serial"
                    type="text"
                    class="h-[30px]"
                  />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                  <label for="name" class="font-semibold w-6rem mr-9"
                    >Giá:</label
                  >
                  <input
                    v-model="editDevices.price"
                    type="text"
                    class="h-[30px]"
                  />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                  <label for="name" class="font-semibold w-6rem mr-1"
                    >Ngày mua:</label
                  >
                  <input
                    v-model="editDevices.purchase"
                    type="date"
                    class="h-[30px]"
                  />
                </div>
              </form>
            </template>
            <template #footer>
              <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                  Decline
                </fwb-button>
                <fwb-button @click="updateDevice" color="green">
                  Cập nhật
                </fwb-button>
              </div>
            </template>
          </fwb-modal>
          <fwb-button color="red" size="sm" outline>Xoá</fwb-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
