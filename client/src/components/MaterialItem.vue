<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { usemaintenanceStore } from "../stores/maintenance.store";
import { FwbButton, FwbModal } from "flowbite-vue";
import dayjs from "dayjs";
const maintenanceStore = usemaintenanceStore();
const item = ref(null);

onMounted(async () => {
  item.value = maintenanceStore.getMaterialItem(id);
});
</script>
<template>
  <div></div>
</template>
