<template>
  <fwb-modal @close="$emit('close')">
    <template #header>
      <div class="flex items-center text-lg">Tạo đơn hàng mới</div>
    </template>
    <template #body>
      <form>
        <div v-for="(item, index) in newOrderItems" :key="index" class="mb-4">
          <div class="flex items-center">
            <label for="materialId" class="font-semibold w-6rem mr-2"
              >Vật tư:</label
            >
            <select v-model="item.materialId">
              <option
                v-for="material in materials"
                :key="material.id"
                :value="material.id"
              >
                {{ material.name }}
              </option>
            </select>
          </div>
          <div class="flex items-center mt-2">
            <label for="quantity" class="font-semibold w-6rem mr-2"
              >Số lượng:</label
            >
            <fwb-input v-model="item.quantity" type="number" min="1" />
          </div>
          <div class="flex items-center mt-2">
            <label for="price" class="font-semibold w-6rem mr-12">Giá:</label>
            <fwb-input v-model="item.price" type="number" min="0" />
          </div>
          <div>
            <fwb-button
              @click.prevent="removeOrderItem(index)"
              color="red"
              outline
              class="mt-2 mr-2"
            >
              Xóa
            </fwb-button>
          </div>
        </div>
        <fwb-button @click.prevent="addNewOrderItem" color="green" outline>
          Thêm vật tư
        </fwb-button>
      </form>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="$emit('close')" color="alternative">Hủy</fwb-button>
        <fwb-button @click="createOrder" color="green">Tạo đơn hàng</fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
<script setup>
import { orderStore } from "@/stores/order.store";
import { materialStore } from "../stores/material.store";
import { ref, onMounted, reactive } from "vue";
import { FwbButton, FwbModal, FwbInput } from "flowbite-vue";
import { useToast } from "vue-toast-notification";

const useMaterialStore = materialStore();
const useOrderStore = orderStore();
const $toast = useToast();
const materials = ref([]);
const emit = defineEmits(["order-created", "close"]);
const newOrderItems = ref([]); // Mảng để lưu trữ thông tin các mặt hàng mới
const showModal1 = ref(true);
onMounted(async () => {
  materials.value = await useMaterialStore.getMaterial();
  console.log(materials.value);
  // Khởi tạo một mặt hàng mới mặc định
});

function addNewOrderItem() {
  newOrderItems.value.push({
    materialId: null,
    quantity: 1,
    price: 0,
  });
}

function removeOrderItem(index) {
  newOrderItems.value.splice(index, 1);
}

async function createOrder() {
  const orderData = {
    orderItems: newOrderItems.value,
  };
  await useOrderStore.createOrder(orderData);
  if (useOrderStore.err) {
    $toast.error(useOrderStore.err, { position: "top-right" });
    return;
  }
  $toast.success(useOrderStore.order.message, { position: "top-right" });
  showModal1.value = false;
  emit("order-created");
  newOrderItems.value = [];
  addNewOrderItem();
}
const selectedCountry = ref();
</script>
