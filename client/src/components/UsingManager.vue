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
} from "flowbite-vue";
import { useToast } from "vue-toast-notification";
import SelectDevice from "@/components/test3.vue";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const useDeviceStore = deviceStore();
const useRoomStore = roomStore();
const useUsageStore = usageStore();
const devices = ref();
const usages = ref();
const rooms = ref();
const allRooms = ref();

const allDeparments = ref();
const deparments = ref();
const $toast = useToast();
onMounted(async () => {
  usages.value = await useUsageStore.getAllUsages();
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
const isShowModal = ref(false);
const isShowModal1 = ref(false);
const isShowModal2 = ref(false);
const deleteUsageId = ref(null);
function closeModal() {
  isShowModal.value = false;
}
function closeModal1() {
  isShowModal1.value = false;
}
function closeModal2() {
  isShowModal2.value = false;
  deleteUsageId.value = null;
}
function showModal() {
  isShowModal.value = true;
}
function showModal1() {
  isShowModal1.value = true;
}
function showModal2(usageId) {
  deleteUsageId.value = usageId;
  isShowModal2.value = true;
}

const editDevices = reactive({
  idUsage: "",
  user: "",
  roomId: "",
  usage_start: "",
  usage_end: "",
  message: "",
});

const updateDevice = async () => {
  console.log(editDevices);
  await useUsageStore.updateUsage(editDevices);
  if (useUsageStore.err) {
    $toast.error(useUsageStore.err, { position: "top-right" });
    return;
  }
  $toast.success(useUsageStore.result.message, {
    position: "top-right",
  });
  closeModal();

  usages.value = await useUsageStore.getAllUsages();
  applyFilters();
};

const selected = ref();

const depselect = ref();
const creDevice = reactive({
  deviceId: "",
  user: "",
  roomId: "",
  usage_start: "",
  usage_end: "",
  message: "",
});

watch(selected, (newValue) => {
  creDevice.roomId = newValue;
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

const handleSelectDevice = (deviceId) => {
  creDevice.deviceId = deviceId;
};
const createDevice = async () => {
  if (!creDevice.deviceId || !creDevice.user) {
    $toast.default("Vui lòng nhập các thông tin", {
      position: "top-right",
    });
    return;
  }
  await useUsageStore.createUsage(creDevice);
  if (useUsageStore.err == 500) {
    $toast.error("Tạo thiết bị không thành công", { position: "top-right" });
    return;
  } else if (useUsageStore.err == 401) {
    $toast.warning("Vui lòng chọn phòng đặt thiết bị ", {
      position: "top-right",
    });
    return;
  }

  $toast.success("Thiết bị đã được đưa vào sử dụng", {
    position: "top-right",
  });

  closeModal1();
  creDevice.deviceId = "";
  creDevice.user = "";
  creDevice.usage_end = "";
  creDevice.usage_start = "";
  creDevice.roomId = "";
  creDevice.message = "";
  selected.value = "";
  depselect.value = "";
  usages.value = await useUsageStore.getAllUsages();
  applyFilters();
};

const deleteUsage = async () => {
  console.log(deleteUsageId.value);
  await useUsageStore.deleteUsage(deleteUsageId.value);
  if (useUsageStore.err) {
    $toast.error(useUsageStore.err, { position: "top-right" });
    return;
  }
  $toast.success(useUsageStore.result.message, {
    position: "top-right",
  });
  closeModal2();
  usages.value = await useUsageStore.getAllUsages();
  applyFilters();
};

const selectedDepartment = ref("");
const selectedRoom = ref("");
const filteredUsages = ref([]);
watch(selectedDepartment, (newValue) => {
  if (newValue === "all") {
    allRooms.value = [];
    selectedRoom.value = null;
  } else {
    const department = allDeparments.value.find((dep) => dep.id === newValue);
    allRooms.value = [{ value: "all", name: "Tất cả phòng" }].concat(
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
      usage.Room.id === selectedRoom.value;
    const departmentMatches =
      selectedDepartment.value === "all" ||
      !selectedDepartment.value ||
      usage.Room.deparment_id === selectedDepartment.value;
    return roomMatches && departmentMatches;
  });
}
function formatDuration(startTime) {
  const start = dayjs(startTime);
  const now = dayjs();
  const diff = now.diff(start);

  const duration = dayjs.duration(diff);

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${days} ngày ${hours} giờ ${minutes} phút`;
}
</script>
<template>
  <div class="flex justify-between items-center pt-3 pb-3">
    <h1 class="text-xl font-bold pl-4">Danh sách thiết bị đang được sử dụng</h1>

    <div class="card flex justify-content-center">
      <fwb-button @click="showModal1" color="green"
        >Đưa thiết bị vào sử dụng
      </fwb-button>
      <fwb-modal v-if="isShowModal1" @close="closeModal1">
        <template #header>
          <div class="flex items-center text-lg">Chọn thiết bị cần sử dụng</div>
        </template>
        <template #body>
          <div class="flex items-center">
            <div class="flex align-items-center gap-3 mb-3 mr-3">
              <SelectDevice @selectDevice="handleSelectDevice" />
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex align-items-center gap-3 mb-3 mr-5">
              <label for="name" class="font-semibold w-6rem"
                >Người sử dụng:</label
              >
              <input v-model="creDevice.user" type="text" class="h-[30px]" />
            </div>
          </div>

          <div class="flex items-center">
            <div class="flex align-items-center gap-3 mb-3 mr-3">
              <fwb-select
                v-model="depselect"
                :options="deparments"
                label="Khoa"
                placeholder="Chọn khoa"
              />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
              <fwb-select
                v-model="selected"
                :options="rooms"
                label="Phòng"
                placeholder="Chọn phòng"
              />
            </div>
          </div>
          <div class="flex align-items-center gap-3 mb-3">
            <label for="name" class="font-semibold w-6rem mr-7"
              >Ngày bắt đầu:</label
            >
            <input
              v-model="creDevice.usage_start"
              type="date"
              class="h-[30px]"
            />
          </div>
          <!-- <div class="flex align-items-center gap-3 mb-3">
            <label for="name" class="font-semibold w-6rem mr-7"
              >Ngày hết hạn:</label
            >
            <input v-model="creDevice.usage_end" type="date" class="h-[30px]" />
          </div> -->
          <fwb-textarea
            v-model="creDevice.message"
            :rows="4"
            label="Mô tả"
            placeholder="Write your message..."
          />
        </template>
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
        :options="allRooms"
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
        <th class="text-center border px-4 py-3">Trạng thái</th>
        <th class="text-center border px-4 py-3">Loại thiết bị</th>
        <th class="text-center border px-4 py-3">Phòng / Khoa</th>
        <th class="text-center border px-4 py-3">Người sử dụng</th>
        <th class="text-center border px-4 py-3">Ngày bắt đầu</th>
        <!-- <th class="text-center border px-4 py-3">Ngày hết hạn</th> -->
        <th class="text-center border px-4 py-3">Thời gian đã sử dụng</th>
        <th class="text-center border px-4 py-3">
          <span class="">Hành động</span>
        </th>
      </tr>
    </thead>
    <tbody v-for="(usage, i) in filteredUsages" :key="usage.id">
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
            >Đang bảo trì</fwb-badge
          >
        </td>
        <td class="text-center border">
          {{ usage.Device.Category.name }}
        </td>
        <td class="text-center border">
          {{ usage.Room.room_name }} /
          {{ usage.Room.deparment.deparment_name }}
        </td>
        <td class="text-center border">
          {{ usage.user }}
        </td>
        <td class="text-center border">
          {{ dayjs(usage.usage_start).format("DD/MM/YYYY") }}
        </td>
        <!-- <td class="text-center border">
          {{ dayjs(usage.usage_end).format("DD/MM/YYYY") }}
        </td> -->
        <td class="text-center border">
          {{ formatDuration(usage.usage_start) }}
        </td>
        <td class="text-center border">
          <fwb-button
            @click="
              () => {
                editDevices.idUsage = usage.id;
                editDevices.user = usage.user;
                editDevices.usage_start = dayjs(usage.usage_start).format(
                  'YYYY-MM-DD'
                );

                editDevices.message = usage.message;
                showModal();
              }
            "
            color="default"
            size="sm"
            outline
            class="mr-2 my-2"
            >Sửa</fwb-button
          >
          <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
              <div class="flex items-center text-lg">
                Nhập thông tin cần sửa
              </div>
            </template>
            <template #body>
              <div class="">
                <div class="flex align-items-center gap-3 mb-3 mr-3">
                  <label for="name" class="font-semibold w-6rem"
                    >Nguời sử dụng:</label
                  >
                  <input
                    v-model="editDevices.user"
                    type="text"
                    class="h-[30px]"
                  />
                </div>
                <!-- <div class="flex align-items-center gap-3 mb-3">
                    <label for="model" class="font-semibold w-6rem"
                      >Model:</label
                    >
                    <input
                      v-model="editDevices.model"
                      type="text"
                      class="h-[30px] w-[150px]"
                    />
                  </div> -->
              </div>
              <div class="flex align-items-center gap-3 mb-3">
                <label for="name" class="font-semibold w-6rem mr-9"
                  >Ngày bắt đầu:</label
                >
                <input
                  v-model="editDevices.usage_start"
                  type="date"
                  class="h-[30px]"
                />
              </div>
              <!-- <div class="flex align-items-center gap-3 mb-3">
                <label for="name" class="font-semibold w-6rem mr-9"
                  >Ngày hết hạn:</label
                >
                <input
                  v-model="editDevices.usage_end"
                  type="date"
                  class="h-[30px]"
                />
              </div> -->
              <div class="text-start">
                <fwb-textarea
                  v-model="creDevice.message"
                  :rows="4"
                  label="Mô tả"
                  placeholder="Write your message..."
                />
              </div>
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
          <fwb-button
            @click="showModal2(usage.id)"
            color="red"
            size="sm"
            outline
            class="mb-2"
            >Xoá</fwb-button
          >
          <fwb-modal
            size="md"
            v-if="isShowModal2 && deleteUsageId === usage.id"
            @close="closeModal2"
          >
            <template #header>
              <div class="flex items-center text-lg font-semibold">
                Xác nhận xoá
              </div>
            </template>
            <template #body>
              <p>Bạn muốn xoá thiết bị đang sử dụng ?</p></template
            >
            <template #footer>
              <div class="flex justify-between">
                <fwb-button @click="closeModal2" color="alternative">
                  Trở về
                </fwb-button>
                <fwb-button @click="deleteUsage(usage.id)" color="red">
                  Xoá
                </fwb-button>
              </div>
            </template>
          </fwb-modal>
        </td>
      </tr>
    </tbody>
  </table>
</template>
