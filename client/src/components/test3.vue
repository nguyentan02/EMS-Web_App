<template>
  <div class="card flex justify-content-center">
    <fwb-button gradient="purple-blue" size="xs" @click="visible = true">
      Chọn thiết bị
    </fwb-button>
    <Dialog
      v-model:visible="visible"
      modal
      header="Danh sách thiết bị"
      :style="{ width: '50rem' }"
    >
      <DataTable
        v-model:selection="selectedProduct"
        :value="products"
        selectionMode="single"
        :paginator="true"
        :rows="5"
        @row-select="onProductSelect"
      >
        <Column
          field="name"
          header="Tên thiết bị"
          sortable
          style="min-width: 12rem"
        ></Column>
        <Column field="model" header="Model" sortable style="min-width: 8rem">
        </Column>
        <Column
          field="serial_number"
          header="Serial"
          sortable
          style="min-width: 8rem"
        >
        </Column>
        <Column
          field="Category.name"
          header="Loại thiết bị"
          sortable
          style="min-width: 8rem"
        >
        </Column>
      </DataTable>
    </Dialog>
  </div>
  <div v-if="selectedProduct && !visible" class="selected-device">
    <h3>Thiết bị:</h3>
    <p>{{ selectedProduct.name }}</p>
    <p>Id:{{ selectedProduct.id }}</p>
    <p>Model:{{ selectedProduct.model }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

import InputText from "primevue/inputtext";

import { useToast } from "primevue/usetoast";
import { deviceStore } from "../stores/devices.store";
import { FwbButton } from "flowbite-vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
const emit = defineEmits(["selectDevice"]);
const toast = useToast();
const useDeviceStore = deviceStore();
const op = ref();
const products = ref();
const selectedProduct = ref();
onMounted(async () => {
  products.value = await useDeviceStore.getAllDevicesNoActive();
});

const onProductSelect = (event) => {
  visible.value = false;
  emit("selectDevice", event.data.id);
};
const visible = ref(false);
</script>
