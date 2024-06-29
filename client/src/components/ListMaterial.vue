<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { materialStore } from "../stores/material.store";
import { FwbFileInput } from "flowbite-vue";

import SearchForm from "../components/SearchForm.vue";
import Loading from "../components/loading.vue";
import {
  FwbButton,
  FwbModal,
  FwbInput,
  FwbSelect,
  FwbToast,
} from "flowbite-vue";
import { useToast } from "vue-toast-notification";

import dayjs from "dayjs";
const useMaterialStore = materialStore();
const $toast = useToast();
const materials = ref([]);

const file = ref(null);
onMounted(async () => {
  materials.value = await useMaterialStore.getMaterial();
});

const isShowModal = ref(false);
const isShowModal1 = ref(false);
const isShowModal2 = ref(false);
const deleteDevice = ref(null);
function closeModal() {
  isShowModal.value = false;
}
function closeModal1() {
  isShowModal1.value = false;
}
function closeModal2() {
  isShowModal2.value = false;
  deleteDevice.value = null;
}
function showModal() {
  isShowModal.value = true;
}
function showModal1() {
  isShowModal1.value = true;
}
function showModal2(id) {
  deleteDevice.value = id;
  isShowModal2.value = true;
}
const editMaterial = reactive({
  id: "",
  name: "",
  imageUrl: "",
  description: "",
  unit: "",
});
const updateDevice = async () => {
  useMaterialStore.isLoading = true;
  const update = new FormData();
  update.append("image", selectedFile.value);
  update.append("id", editMaterial.id);
  update.append("name", editMaterial.name);
  update.append("description", editMaterial.description);
  update.append("unit", editMaterial.unit);
  await useMaterialStore.updateMaterial(update);
  useMaterialStore.isLoading = false;
  if (useMaterialStore.err) {
    $toast.error(useMaterialStore.err, { position: "top-right" });
    return;
  }
  $toast.success(useMaterialStore.result.message, { position: "top-right" });
  closeModal();
  materials.value = await useMaterialStore.getMaterial();
};

const createMaterial = reactive({
  name: "",
  imageUrl: "",
  description: "",
  unit: "",
});

const createDevice = async () => {
  closeModal1();
  useMaterialStore.isLoading = true;
  const data = new FormData();
  data.append("image", selectedFile.value);
  data.append("name", createMaterial.name);
  data.append("description", createMaterial.description);
  data.append("unit", createMaterial.unit);
  await useMaterialStore.createMaterial(data);
  useMaterialStore.isLoading = false;

  if (useMaterialStore.err) {
    $toast.error(useMaterialStore.err, { position: "top-right" });
    return;
  }
  $toast.success(useMaterialStore.result.message, { position: "top-right" });

  materials.value = await useMaterialStore.getMaterial();
};

const deletedDevice = async () => {
  await useMaterialStore.deletedMaterial(deleteDevice.value);
  if (useMaterialStore.err) {
    $toast.error(useMaterialStore.err, { position: "top-right" });
    return;
  }
  $toast.success(useMaterialStore.result.message, { position: "top-right" });
  closeModal2();
  materials.value = await useMaterialStore.getMaterial();
};

const selectedFile = ref(null);

const onFileSelected = (event) => {
  selectedFile.value = event.target.files[0];
  console.log(selectedFile.value);
};
</script>
<template>
  <div class="flex justify-between items-center pt-3 pb-3">
    <h1 class="text-xl font-bold pl-4">Danh sách vật tư</h1>

    <div class="card flex justify-content-center">
      <fwb-button @click="showModal1">Thêm vật tư</fwb-button>
      <fwb-modal v-if="isShowModal1" @close="closeModal1">
        <template #header>
          <div class="flex items-center text-lg">Nhập thông tin vật tư</div>
        </template>
        <template #body>
          <form>
            <div class="flex items-center">
              <div class="flex align-items-center gap-3 mb-3 mr-3">
                <label for="name" class="font-semibold w-6rem"
                  >Tên vật tư:</label
                >
                <input
                  v-model="createMaterial.name"
                  type="text"
                  class="h-[30px]"
                />
              </div>
              <div class="flex align-items-center gap-3 mb-3"></div>
            </div>

            <div class="flex align-items-center gap-3 mb-3 mr-5">
              <input
                @change="onFileSelected"
                type="file"
                name="images"
                id="images"
                accept="image/png, image/jpeg"
              />
            </div>

            <div class="flex flex-col">
              <div class="flex align-items-center gap-3 mb-3 mr-5">
                <label for="name" class="font-semibold w-6rem mr-14"
                  >Đơn vị:</label
                >
                <input
                  v-model="createMaterial.unit"
                  type="text"
                  class="h-[30px]"
                />
              </div>
              <div class="flex align-items-center gap-3 mb-3 mr-5">
                <label for="name" class="font-semibold w-6rem mr-14 pr-1"
                  >Mô tả:</label
                >
                <input
                  v-model="createMaterial.description"
                  type="text"
                  class="h-[30px]"
                />
              </div>
            </div></form
        ></template>
        <template #footer>
          <div class="flex justify-between">
            <fwb-button @click="closeModal1" color="alternative">
              Trở về
            </fwb-button>
            <fwb-button @click="createDevice" color="green">
              Tạo mới
            </fwb-button>
          </div>
        </template>
      </fwb-modal>
    </div>
  </div>

  <hr />
  <SearchForm />

  <div
    v-if="!materials.length === 0 && !useMaterialStore.isLoading"
    class="text-center py-4"
  >
    <p>Không có thiết bị nào</p>
  </div>
  <Loading class="m-auto" v-else-if="useMaterialStore.isLoading" />
  <table v-else class="w-full text-sm text-left text-gray-700">
    <thead class="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th class="text-center border px-4 py-3">STT</th>
        <th class="text-center border px-4 py-3">Tên Vật Liệu</th>
        <th class="text-center border px-4 py-3">Hình Ảnh</th>
        <th class="text-center border px-4 py-3">Đơn vị</th>
        <th class="text-center border px-4 py-3">Mô tả</th>

        <th class="text-center border px-4 py-3">
          <span class="">Hành động</span>
        </th>
      </tr>
    </thead>
    <tbody v-for="(material, i) in materials" :key="material.id">
      <tr class="">
        <td class="text-center border">{{ i + 1 }}</td>
        <td class="text-center font-medium text-gray-900 border">
          {{ material.name }}
        </td>
        <td class="text-center border">
          <div class="flex justify-center">
            <img :src="material.imageUrl" alt="image" class="h-[50px]" />
          </div>
        </td>
        <td class="text-center border">
          {{ material.unit }}
        </td>
        <td class="text-center border">
          {{ material.description }}
        </td>
        <td class="text-center border">
          <fwb-button
            @click="
              () => {
                editMaterial.id = material.id;
                editMaterial.name = material.name;
                editMaterial.description = material.description;
                editMaterial.unit = material.unit;
                showModal();
              }
            "
            color="default"
            size="sm"
            outline
            class="mr-2"
            >Sửa</fwb-button
          >
          <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
              <div class="flex items-center text-lg">
                Nhập thông tin cần sửa
              </div>
            </template>
            <template #body>
              <form>
                <input type="hidden" v-model="editMaterial.id" name="id" />
                <div class="flex">
                  <div class="flex align-items-center gap-3 mb-3 mr-3">
                    <label for="name" class="font-semibold w-6rem"
                      >Tên thiết bị:</label
                    >
                    <input
                      v-model="editMaterial.name"
                      type="text"
                      class="h-[30px]"
                    />
                  </div>
                  <div class="flex align-items-center gap-3 mb-3">
                    <label for="model" class="font-semibold w-6rem"
                      >Đơn vị:</label
                    >
                    <input
                      v-model="editMaterial.unit"
                      type="text"
                      class="h-[30px] w-[150px]"
                    />
                  </div>
                </div>
                <div class="flex align-items-center gap-3 mb-3 mr-5">
                  <input
                    @change="onFileSelected"
                    type="file"
                    name="images"
                    id="images"
                    accept="image/png, image/jpeg"
                  />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                  <label for="name" class="font-semibold w-6rem mr-9"
                    >Mô tả:</label
                  >
                  <input
                    v-model="editMaterial.description"
                    type="text"
                    class="h-[30px]"
                  />
                </div>
              </form>
            </template>
            <template #footer>
              <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                  Decline
                </fwb-button>
                <fwb-button @click="updateDevice" color="green">
                  Cập nhật
                </fwb-button>
              </div>
            </template>
          </fwb-modal>
          <fwb-button
            @click="showModal2(material.id)"
            color="red"
            size="sm"
            outline
            >Xoá</fwb-button
          >
          <fwb-modal
            size="md"
            v-if="isShowModal2 && deleteDevice === material.id"
            @close="closeModal2"
          >
            <template #header>
              <div class="flex items-center text-lg font-semibold">
                Xác nhận xoá
              </div>
            </template>
            <template #body> <p>Bạn muốn xoá vật tư?</p></template>
            <template #footer>
              <div class="flex justify-between">
                <fwb-button @click="closeModal2" color="alternative">
                  Trở về
                </fwb-button>
                <fwb-button @click="deletedDevice(material.id)" color="red">
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
