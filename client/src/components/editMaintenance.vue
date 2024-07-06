<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { FwbButton, FwbModal, FwbInput } from "flowbite-vue";
import { useToast } from "vue-toast-notification";
import { usemaintenanceStore } from "../stores/maintenance.store";
import { usePersonnelStore } from "@/stores/personnel.store";
import dayjs from "dayjs";
const $toast = useToast();
const emit = defineEmits(["close", "maintenanceUpdated", "refresh"]);
const props = defineProps({
  maintenance: {
    type: Object,
    required: true,
  },
});

const visible = ref(false);
const maintenanceStore = usemaintenanceStore();
const personnelStore = usePersonnelStore();
onMounted(async () => {
  await maintenanceStore.getInventoy();
  await personnelStore.getPersonnel();
});

const editedMaintenance = reactive({
  id: props.maintenance.id,
  deviceId: props.maintenance.deviceId,
  employee_code: props.maintenance.employee_code,
  date_start: dayjs(props.maintenance.date_start).format("YYYY-MM-DD"),
  date_end: dayjs(props.maintenance.date_end).format("YYYY-MM-DD"),
  cost: props.maintenance.cost,
  statusId: props.maintenance.statusId,
  description: props.maintenance.description,
  materialItem: props.maintenance.inventories.map((item) => ({
    id: item.id,
    inventoryId: item.inventoryId,
    quantityMater: item.quantityMater,
  })),
});

function addMaterialItem(event) {
  event.preventDefault();
  editedMaintenance.materialItem.push({
    inventoryId: null,
    quantityMater: 1,
  });
}
async function removeMaterialItem(index, id) {
  editedMaintenance.materialItem.splice(index, 1);
  await maintenanceStore.deletedItem(id);
}
function mergeMaterialItems() {
  const mergedItems = [];
  editedMaintenance.materialItem.forEach((item) => {
    const existingItem = mergedItems.find(
      (i) => i.inventoryId === item.inventoryId
    );
    if (existingItem) {
      existingItem.quantityMater += item.quantityMater;
    } else {
      mergedItems.push({ ...item });
    }
  });
  editedMaintenance.materialItem = mergedItems;
}
async function updateMaintenance() {
  mergeMaterialItems();
  await maintenanceStore.updateMaint(editedMaintenance);
  if (maintenanceStore.err) {
    $toast.error(maintenanceStore.err, { position: "top-right" });
    return;
  }
  $toast.success(maintenanceStore.result.message, {
    position: "top-right",
  });
  emit("close");
  emit("refresh");
}
</script>

<template>
  <fwb-modal v-model="visible" @close="$emit('close')">
    <template #header>
      <div class="flex items-center text-lg">
        Sửa Thông Tin Kế Hoạch Bảo Trì
      </div>
    </template>
    <template #body>
      <form>
        <div class="text-left">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700"
              >Thiết bị:</label
            >
            <p class="mt-1">
              {{ props.maintenance.device.name }} (ID:
              {{ editedMaintenance.deviceId }})
            </p>
          </div>
          <div class="mb-4">
            <label for="date_start" class="text-sm font-medium text-gray-700"
              >Ngày bắt đầu:</label
            >
            <input
              v-model="editedMaintenance.date_start"
              type="date"
              id="date_start"
            />
          </div>

          <div class="mb-4">
            <label for="date_end" class="text-sm font-medium text-gray-700"
              >Ngày kết thúc:</label
            >
            <input
              v-model="editedMaintenance.date_end"
              type="date"
              id="date_end"
            />
          </div>

          <div class="mb-4">
            <label for="cost" class="text-sm font-medium text-gray-700"
              >Chi phí:</label
            >
            <input v-model="editedMaintenance.cost" type="number" id="cost" />
          </div>
        </div>

        <div class="flex items-center mb-4">
          <label for="materialId" class="font-semibold w-6rem mr-2"
            >Kỹ thuật viên:</label
          >
          <select v-model="editedMaintenance.employee_code">
            <option
              v-for="personnel in personnelStore.personnel"
              :key="personnel.id"
              :value="personnel.id"
            >
              {{ personnel.name }}
            </option>
          </select>
        </div>
      </form>
      <div v-if="editedMaintenance.materialItem.length === 0" class="mb-5">
        <p>Không có vật tư nào. Vui lòng thêm vật tư.</p>
      </div>
      <div v-for="(item, index) in editedMaintenance.materialItem" :key="index">
        <div class="flex items-center mb-4">
          <label for="materialId" class="font-semibold w-6rem mr-2"
            >Vật tư:</label
          >
          <select v-model="item.inventoryId">
            <option
              v-for="inventory in maintenanceStore.inventorys"
              :key="inventory.id"
              :value="inventory.id"
            >
              {{ inventory.material.name }}
            </option>
          </select>
          <label for="quantity" class="font-semibold w-2rem mr-2"
            >Số lượng:</label
          >
          <fwb-input v-model="item.quantityMater" type="number" min="1" />
          <fwb-button
            @click="() => removeMaterialItem(index, item.id)"
            color="red"
            outline
            class="ml-2"
            >Xóa</fwb-button
          >
        </div>
      </div>
      <div>
        <label for="quantity" class="font-semibold w-2rem mr-2"
          >Tiến độ bảo trì:</label
        >
        <select v-model="editedMaintenance.statusId">
          <option value="4">Chưa hoàn thành</option>
          <option value="3">Hoàn thành</option>
        </select>
      </div>
      <fwb-button @click="addMaterialItem" color="green" outline class="mt-2"
        >Thêm vật tư</fwb-button
      >
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="$emit('close')" color="alternative">Hủy</fwb-button>
        <fwb-button @click="updateMaintenance" color="green"
          >Cập nhật</fwb-button
        >
      </div>
    </template>
  </fwb-modal>
</template>
