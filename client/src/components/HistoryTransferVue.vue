<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";

import { deviceStore } from "../stores/devices.store";
import { usageStore } from "@/stores/usage.store";
import SearchForm from "../components/SearchForm.vue";
import Column from "primevue/column";
import Toast from "primevue/toast";
import DataTable from "primevue/datatable";

import dayjs from "dayjs";

const useHistoryStore = deviceStore();

const expandedRows = ref();
const useUsageStore = usageStore();
const historys = ref([]);
const filteredUsages = ref([]);
const paginatedUsages = ref([]);
const first = ref(0);
const rowsPerPage = ref(4);
const totalRecords = ref(0);
const toast = useToast();

const handleSearch = (search) => {
  if (search) {
    filteredUsages.value = historys.value.filter((device) =>
      device.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredUsages.value = historys.value;
  }
  updatePagination();
};

const updatePagination = () => {
  totalRecords.value = filteredUsages.value.length;
  paginatedUsages.value = filteredUsages.value.slice(
    first.value,
    first.value + rowsPerPage.value
  );
};

const onPage = (event) => {
  first.value = event.first;
  rowsPerPage.value = event.rows;
  updatePagination();
};

onMounted(async () => {
  historys.value = await useHistoryStore.getHistoryTrans();
  filteredUsages.value = historys.value;
  console.log(filteredUsages.value);
  updatePagination();
});

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY HH:MM:ss");
};
</script>
<template>
  <div>
    <h1 class="text-xl font-bold pl-4">Lịch sử luân chuyển của các thiết bị</h1>
  </div>
  <SearchForm @search="handleSearch" />

  <div v-if="filteredUsages.length > 0" class="card">
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="paginatedUsages"
      lazy
      paginator
      :first="first"
      :rows="rowsPerPage"
      :totalRecords="totalRecords"
      dataKey="id"
      tableStyle="min-width: 60rem"
      @page="onPage"
    >
      <Column expander style="width: 5rem" />
      <Column field="name" header="Tên thiết bị"></Column>
      <Column field="model" header="Model"> </Column>
      <Column field="serial_number" header="Serial"></Column>
      <Column field="Category.name" header="Loại thiết bị"> </Column>
      <template #expansion="slotProps">
        <div class="p-2">
          <h5 class="font-semibold">
            Lịch sử luân chuyển của {{ slotProps.data.name }}
          </h5>
          <DataTable :value="slotProps.data.HistoryTransfer">
            <Column field="deviceId" header="Id" class="border"></Column>
            <Column header="Phòng / Khoa Cũ">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.OldRoom.room_name }} /
                  {{ slotProps.data.OldRoom.deparment.deparment_name }}
                </span>
              </template>
            </Column>
            <Column field="user" header="Phòng / Khoa mới">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.NewRoom.room_name }} /
                  {{ slotProps.data.NewRoom.deparment.deparment_name }}
                </span>
              </template>
            </Column>
            <Column field="usage_start" header="Thời gian luân chuyển">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.transferDate) }}
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
    <Toast />
  </div>
  <div v-else class="no-results-message">Không tìm thấy kết quả phù hợp.</div>
</template>
