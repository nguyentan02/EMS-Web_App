<script setup>
import { useToast } from "vue-toast-notification";
import { ref, onMounted, reactive } from "vue";
import { useAuthStore } from "../stores/auth.store";
import SearchForm from "../components/SearchForm.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";

import Password from "primevue/password";
import dayjs from "dayjs";
const visible = ref(false);
const user = reactive({
  username: "",
  password: "",
});

const useAuth = useAuthStore();
const $toast = useToast();

const users = ref([]);
const authStore = useAuthStore();
onMounted(async () => {
  users.value = await useAuth.getUsers();
});
const submitRegister = async () => {
  await authStore.register(user);

  if (authStore.err) {
    $toast.error(authStore.err, { position: "top-right" });
    return;
  }
  $toast.success(authStore.result.message, { position: "top-right" });
  users.value = await useAuth.getUsers();
  user.username = " ";
  user.password = " ";
};

const unlockUser = async (id) => {
  await authStore.unLockUser(id);
  if (authStore.err) {
    $toast.error(authStore.err, { position: "top-right" });
    return;
  }
  $toast.success(authStore.result.message, { position: "top-right" });
  users.value = await useAuth.getUsers();
};

const lockUser = async (id) => {
  await authStore.lockUser(id);
  if (authStore.err) {
    $toast.error(authStore.err, { position: "top-right" });
    return;
  }
  $toast.success(authStore.result.message, { position: "top-right" });
  users.value = await useAuth.getUsers();
};
</script>

<template>
  <div class="flex justify-between items-center pt-3 pb-3">
    <h1 class="text-xl font-bold pl-4">Danh sách tài khoản</h1>

    <div class="card flex justify-content-center">
      <div>
        <Button
          class="h-[40px] w-[200px]"
          label="Thêm tài khoản"
          @click="visible = true"
        />
      </div>

      <Dialog
        v-model:visible="visible"
        modal
        header="Tạo tài khoản"
        :style="{ width: '25rem' }"
      >
        <form @submit.prevent="submitRegister">
          <div class="flex align-items-center gap-3 mb-3">
            <label for="username" class="font-semibold w-6rem">Username</label>
            <InputText
              v-model="user.username"
              id="username"
              class="h-[40px]"
              autocomplete="off"
            />
          </div>
          <div class="flex align-items-center gap-3 mb-5">
            <label for="password" class="font-semibold w-6rem">Mật khẩu</label>
            <Password
              v-model="user.password"
              :feedback="false"
              class="h-[40px]"
              toggleMask
            />
          </div>
          <div class="flex justify-content-end gap-2">
            <Button
              class="h-[40px]"
              type="button"
              label="Cancel"
              severity="secondary"
              @click="visible = false"
            ></Button>
            <Button
              class="h-[40px]"
              type="submit"
              label="Đăng kí"
              @click="visible = false"
            ></Button>
          </div>
        </form>
      </Dialog>
    </div>
  </div>

  <hr />
  <SearchForm />
  <table class="table-auto w-full text-sm text-left text-gray-700">
    <thead class="text-xs text-gray-700 bg-gray-50">
      <tr>
        <th class="px-4 py-3">ID</th>
        <th class="px-4 py-3">Tên Người Dùng</th>
        <th class="px-4 py-3">Trạng thái</th>
        <th class="px-4 py-3">Ngày tạo</th>
        <th class="px-4 py-3">
          <span class="">Hành động</span>
        </th>
      </tr>
    </thead>
    <tbody v-for="user in users" :key="user.id">
      <tr class="border">
        <td class="px-4 py-3 font-medium text-gray-900">{{ user.id }}</td>
        <td class="px-4 py-3 font-medium text-gray-900">{{ user.username }}</td>
        <td class="flex items-center mt-3">
          <span v-if="user.status === 'active'" class="text-sky-500 font-medium"
            >Hoạt động</span
          >
          <span v-else class="text-red-500 font-medium">Khóa</span>
        </td>
        <td>
          {{ dayjs(user.createdAt).format("DD/MM/YYYY") }}
        </td>
        <td>
          <div class="text">
            <button
              v-if="user.status === 'locked'"
              @click="unlockUser(user.id)"
              class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              Mở khoá
            </button>
            <button
              v-else-if="user.status === 'active'"
              @click="lockUser(user.id)"
              class="inline-flex items-center rounded-md bg-yellow-400 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-green-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>

              Khoá
            </button>
            <!-- <button
              class="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-green-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Xoá
            </button> -->
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
