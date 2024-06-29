<script setup>
import { ref, onMounted, reactive } from "vue";
import { usemaintenanceStore } from "../stores/maintenance.store";
import { usePersonnelStore } from "@/stores/personnel.store";
import { FwbButton, FwbModal, FwbInput } from "flowbite-vue";
import SelectDevice from "@/components/SelectDeviceMaintenance.vue";
import { useToast } from "vue-toast-notification";
const emit = defineEmits(["close", "refresh"]);
const maintenanceStore = usemaintenanceStore();
const personnelStore = usePersonnelStore();
const personnel = ref();
const $toast = useToast();
const maintenancePlan = reactive({
  deviceId: null,
  date_start: "",
  date_end: "",
  employee_code: null,
  cost: 0,
  description: "",
  materialItem: [],
});

onMounted(async () => {
  await maintenanceStore.getInventoy();
  personnel.value = await personnelStore.getPersonnel();
  console.log(personnel.value);
});

function addMaterialItem() {
  maintenancePlan.materialItem.push({
    inventoryId: null,
    quantityMater: 1, // Default quantity to 1
  });
}

function removeMaterialItem(index) {
  maintenancePlan.materialItem.splice(index, 1);
}

async function createMaintenance() {
  // Validate form data (optional)
  console.log(maintenancePlan);
  await maintenanceStore.createMaintenance(maintenancePlan);
  if (maintenanceStore.err) {
    $toast.error("Lập kế hoạch không thành công", { position: "top-right" });
    return;
  }
  $toast.success("Lập kế hoạch thành công ", {
    position: "top-right",
  });
  emit("close");
  maintenancePlan.deviceId = null;
  maintenancePlan.date_start = "";
  maintenancePlan.date_end = "";
  maintenancePlan.employee_code = null;
  maintenancePlan.cost = 0;
  maintenancePlan.description = "";
  maintenancePlan.materialItem = [];
  emit("refresh");
}
const handleSelectDevice = (device) => {
  maintenancePlan.deviceId = device;
};
</script>

<template>
  <fwb-modal @close="$emit('close')">
    <template #header>
      <div class="flex items-center text-lg">
        Nhập thông tin kế hoạch bảo trì
      </div>
    </template>
    <template #body>
      <div class="">
        <label for="">Chọn thiết bị bảo trì:</label>
        <div class="flex align-items-center gap-3 mb-3 mr-3">
          <SelectDevice @selectDevice="handleSelectDevice" />
        </div>
      </div>

      <form>
        <div class="mb-4">
          <label
            for="date_start"
            class="block text-sm font-medium text-gray-700"
            >Ngày bắt đầu:</label
          >
          <input
            v-model="maintenancePlan.date_start"
            type="date"
            id="date_start"
          />
        </div>

        <div class="mb-4">
          <label for="date_end" class="block text-sm font-medium text-gray-700"
            >Ngày kết thúc:</label
          >
          <input v-model="maintenancePlan.date_end" type="date" id="date_end" />
        </div>

        <div class="mb-4">
          <label for="materialId" class="font-semibold w-6rem mr-2"
            >Kỹ thuật viên:</label
          >
          <select v-model="maintenancePlan.employee_code">
            <!-- <option value=""></option> -->
            <option
              v-for="personne in personnel"
              :key="personne.id"
              :value="personne.id"
            >
              {{ personne.name }}
            </option>
          </select>
        </div>
        <div class="flex items-center mb-4">
          <label class="block text-sm font-medium text-gray-700 mr-2"
            >Chi phí:</label
          >
          <input
            v-model="maintenancePlan.cost"
            type="number"
            id="deviceId"
            placeholder="Nhập chi phí bảo trì"
          />
        </div>
      </form>

      <div v-for="(item, index) in maintenancePlan.materialItem" :key="index">
        <div class="flex items-center mb-2">
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
            @click="removeMaterialItem(index)"
            color="red"
            outline
            class="ml-2"
            >Xóa</fwb-button
          >
        </div>
      </div>

      <fwb-button @click="addMaterialItem" color="green" outline class="mt-2"
        >Chọn vật tư</fwb-button
      >
    </template>

    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="$emit('close')" color="alternative">Hủy</fwb-button>
        <fwb-button @click="createMaintenance" color="green"
          >Tạo kế hoạch</fwb-button
        >
      </div>
    </template>
  </fwb-modal>
</template>
