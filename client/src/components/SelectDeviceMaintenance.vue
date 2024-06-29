<template>
  <div class="card flex justify-content-center">
    <fwb-button gradient="purple-blue" size="xs" @click="visible = true">
      Chọn thiết bị
    </fwb-button>
    <Dialog
      v-model:visible="visible"
      modal
      header="Danh sách thiết bị"
      :style="{ width: '55rem' }"
    >
      <DataTable
        v-model:selection="selectedProduct"
        :value="filteredDevices"
        selectionMode="single"
        :paginator="true"
        :rows="5"
        @row-select="onProductSelect"
      >
        <Column
          field="Device.name"
          header="Tên thiết bị"
          sortable
          style="min-width: 12rem"
        ></Column>
        <Column
          field="Device.model"
          header="Model"
          sortable
          style="min-width: 8rem"
        >
        </Column>
        <Column
          field="Device.serial_number"
          header="Serial"
          sortable
          style="min-width: 8rem"
        >
        </Column>
        <Column
          field="Device.Category.name"
          header="Loại thiết bị"
          sortable
          style="min-width: 8rem"
        >
        </Column>
        <Column
          field="Device.Room.room_name"
          header="Phòng"
          sortable
          style="min-width: 8rem"
        >
        </Column>
      </DataTable>
    </Dialog>
  </div>
  <div v-if="selectedProduct && !visible" class="selected-device">
    <h3>Thiết bị:{{ selectedProduct.Device.name }}</h3>
    <p>Id:{{ selectedProduct.Device.id }}</p>
    <p>Model:{{ selectedProduct.Device.model }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

import InputText from "primevue/inputtext";

import { useToast } from "primevue/usetoast";
import { deviceStore } from "../stores/devices.store";
import { usageStore } from "@/stores/usage.store";
import { FwbButton } from "flowbite-vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
const emit = defineEmits(["selectDevice"]);
const toast = useToast();
const useDeviceStore = deviceStore();
const useUsageStore = usageStore();

const op = ref();
const products = ref();

const selectedProduct = ref();
onMounted(async () => {
  products.value = await useUsageStore.getAllUsages();
  console.log(products.value);
});
const filteredDevices = computed(() => {
  return products.value?.filter((device) => device.Device.statusId === 2) ?? [];
});
const onProductSelect = (event) => {
  visible.value = false;

  emit("selectDevice", event.data.deviceId);
};
const visible = ref(false);
</script>
