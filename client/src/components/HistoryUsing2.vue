<template>
  <div>
    <h1 class="text-xl font-bold pl-4">Lịch sử sử dụng của các thiết bị</h1>
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
            Lịch sử sử dụng của {{ slotProps.data.name }}
          </h5>
          <DataTable :value="slotProps.data.UsageHistory">
            <Column field="deviceId" header="Id" class="border"></Column>
            <Column header="Phòng / Khoa">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.Room.room_name }} /
                  {{ slotProps.data.Room.deparment.deparment_name }}
                </span>
              </template>
            </Column>
            <Column field="user" header="Người sử dụng"></Column>
            <Column field="usage_start" header="Ngày bắt đầu">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.usage_start) }}
              </template>
            </Column>
            <Column field="end" header="Ngày kết thúc">
              <template #body="slotProps">
                <span v-if="slotProps.data.end === null">Đang hoạt động</span>
                <span v-else> {{ formatDate(slotProps.data.end) }}</span>
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
<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import dayjs from "dayjs";
import { deviceStore } from "../stores/devices.store";
import { usageStore } from "@/stores/usage.store";
import SearchForm from "../components/SearchForm.vue";
import Column from "primevue/column";
import Toast from "primevue/toast";
import DataTable from "primevue/datatable";

const expandedRows = ref();
const useUsageStore = usageStore();
const usages = ref([]);
const filteredUsages = ref([]);
const paginatedUsages = ref([]);
const first = ref(0);
const rowsPerPage = ref(4);
const totalRecords = ref(0);
const toast = useToast();

const handleSearch = (search) => {
  if (search) {
    filteredUsages.value = usages.value.filter((device) =>
      device.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredUsages.value = usages.value;
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
  usages.value = await useUsageStore.getAllUsagesTrue();
  filteredUsages.value = usages.value;
  console.log(filteredUsages.value);
  updatePagination();
});

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};
</script>
