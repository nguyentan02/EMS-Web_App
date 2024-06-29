<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { usemaintenanceStore } from "../stores/maintenance.store";
import { FwbButton, FwbModal, FwbBadge } from "flowbite-vue";
import createItem from "../components/createManitenance.vue";
import EditMaintenance from "../components/editMaintenance.vue";
import { useToast } from "vue-toast-notification";
const $toast = useToast();

import dayjs from "dayjs";
const maintenanceStore = usemaintenanceStore();
const maintenances = ref(null);

const showModal = ref(false);

function openModal() {
  showModal.value = true;
}
// function closeModal() {
//   showModal.value = false;
// }
const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

onMounted(async () => {
  maintenances.value = await maintenanceStore.getMaintenance();
});
const refreshNew = async () => {
  maintenances.value = await maintenanceStore.getMaintenance();
};

const isEditModalVisible = ref(false);
const selectedMaintenance = ref(null);
function openEditModal(maintenance) {
  selectedMaintenance.value = maintenance;
  isEditModalVisible.value = true;
}

async function handleMaintenanceUpdated() {
  await maintenanceStore.getMaintenance();
}
const isShowModal2 = ref(false);
const deleteUsageId = ref(null);
function closeModal2() {
  isShowModal2.value = false;
  deleteUsageId.value = null;
}
function showModal2(usageId) {
  deleteUsageId.value = usageId;
  isShowModal2.value = true;
}
const deletedMaintenance = async () => {
  console.log(deleteUsageId.value);
  await maintenanceStore.deletedMaintenance(deleteUsageId.value);
  if (maintenanceStore.err) {
    $toast.error(maintenanceStore.err, { position: "top-right" });
    closeModal2();
    return;
  }
  $toast.success(maintenanceStore.result.message, {
    position: "top-right",
  });
  closeModal2();
  refreshNew();
};
</script>
<template>
  <div class="flex justify-between items-center pt-3 pb-3">
    <h1 class="text-xl font-bold pl-4">Danh sách thiết bị bảo trì, sửa chữa</h1>

    <div class="card flex justify-content-center">
      <fwb-button @click="openModal">Lập kế hoạch bảo trì</fwb-button>
      <createItem
        v-if="showModal"
        @close="showModal = false"
        @refresh="refreshNew"
      />
    </div>
  </div>
  <div
    v-if="!maintenances || maintenances.length === 0"
    class="text-center py-4"
  >
    <p>Không có thiết bị nào</p>
  </div>
  <table v-else class="table-auto w-full text-sm text-left text-gray-700">
    <thead class="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th class="text-center border px-4">STT</th>
        <th class="text-center border px-4">Tên thiết bị - ID</th>
        <th class="text-center border px-4">Vị trí</th>
        <th class="text-center border px-4">Ngày bắt đầu</th>
        <th class="text-center border px-4">Ngày kết thúc</th>
        <th class="text-center border px-4">Kỹ thuật viên</th>
        <th class="text-center border px-4">Chi phí</th>
        <th class="text-center border px-4">Tiến độ</th>
        <th class="text-center border px-4">
          <span class="">Hành động</span>
        </th>
      </tr>
    </thead>
    <tbody v-for="(maintenance, i) in maintenances" :key="maintenance.id">
      <tr class="">
        <td class="text-center border">{{ i + 1 }}</td>
        <td class="text-center font-medium text-gray-900 border">
          {{ maintenance.device.name }} - {{ maintenance.device.id }}
        </td>
        <td class="text-center border">
          {{ maintenance.device.Room.room_name }} -
          {{ maintenance.device.Room.deparment.deparment_name }}
        </td>
        <td class="text-center border">
          {{ dayjs(maintenance.date_start).format("DD/MM/YYYY HH:MM:ss") }}
        </td>
        <td class="text-center border">
          {{ dayjs(maintenance.date_end).format("DD/MM/YYYY HH:MM:ss") }}
        </td>
        <td class="text-center border">
          {{ maintenance.nhan_vien.name }}
        </td>
        <td class="text-center border text-red-500 font-semibold">
          {{ formatCurrency(maintenance.cost) }}
        </td>
        <td class="text-center border">
          <fwb-badge
            v-if="maintenance.Status.id === 4"
            type="yellow"
            class="w-[90px] ml-2"
            >{{ maintenance.Status.name }}</fwb-badge
          >
          <fwb-badge
            v-else="maintenance.Status.id === 3"
            type="green"
            class="w-[90px] ml-2"
            >{{ maintenance.Status.name }}</fwb-badge
          >
        </td>
        <td class="text-center border">
          <fwb-button
            @click="openEditModal(maintenance)"
            color="default"
            size="sm"
            outline
            class="mr-2"
            >Sửa</fwb-button
          >
          <EditMaintenance
            v-if="isEditModalVisible"
            :maintenance="selectedMaintenance"
            @close="isEditModalVisible = false"
            @maintenanceUpdated="handleMaintenanceUpdated"
            @refresh="refreshNew"
          />
          <fwb-button
            @click="showModal2(maintenance.id)"
            color="red"
            size="sm"
            outline
            >Xoá</fwb-button
          >
          <fwb-modal
            size="md"
            v-if="isShowModal2 && deleteUsageId === maintenance.id"
            @close="closeModal2"
          >
            <template #header>
              <div class="flex items-center text-lg font-semibold">
                Xác nhận xoá
              </div>
            </template>
            <template #body> <p>Bạn muốn xoá kế hoạch bảo trì</p></template>
            <template #footer>
              <div class="flex justify-between">
                <fwb-button @click="closeModal2" color="alternative">
                  Trở về
                </fwb-button>
                <fwb-button
                  @click="deletedMaintenance(maintenance.id)"
                  color="red"
                >
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
