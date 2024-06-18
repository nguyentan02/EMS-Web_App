<template>
  <tbody v-for="(usage, i) in usages" :key="usage.id">
    <tr class="">
      <td class="text-center border">
        <fwb-button
          @click="showDeleteConfirmation(usage.id)"
          color="red"
          size="sm"
          outline
        >
          Xoá
        </fwb-button>

        <fwb-modal
          size="md"
          v-if="showDeleteModal && selectedUsageId === usage.id"
          @close="closeDeleteConfirmation"
        >
          <template #header>
            <div class="flex items-center text-lg font-semibold">
              Xác nhận xoá
            </div>
          </template>
          <template #body>
            <p>Bạn muốn xoá thiết bị đang sử dụng?</p>
          </template>
          <template #footer>
            <div class="flex justify-between">
              <fwb-button @click="closeDeleteConfirmation" color="alternative">
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
</template>

<script setup>
// ... (your other imports and setup logic)

const showDeleteModal = ref(false);
const selectedUsageId = ref(null);

function showDeleteConfirmation(usageId) {
  selectedUsageId.value = usageId;
  showDeleteModal.value = true;
}

function closeDeleteConfirmation() {
  showDeleteModal.value = false;
  selectedUsageId.value = null;
}
</script>
