<script setup>
import { useToast } from "vue-toast-notification";
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth.store";
import SearchForm from "../components/SearchForm.vue";
const useAuth = useAuthStore();
// const getUser = async () => {

// };
const users = ref([]);
onMounted(async () => {
  users.value = await useAuth.getUsers();
});
</script>
<template>
  <div class="flex justify-between items-center pt-3 pb-3">
    <h1 class="text-xl font-bold pl-4">Danh sách tài khoản</h1>
    <button
      class="mr-3 inline-flex items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-green-600/20"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-pencil mr-2 w-[20px] h-[25px]"
        viewBox="0 0 16 16"
      >
        <path
          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
        />
      </svg>
      Thêm tài khoản
    </button>
  </div>

  <hr />
  <SearchForm />
  <table
    class="table-auto w-full text-sm text-left text-gray-700"
    v-for="user in users"
    :key="user.id"
  >
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th class="px-4 py-3">UserName</th>
        <th class="px-4 py-3">Status</th>
        <th class="px-4 py-3">Date created</th>
        <th class="px-4 py-3">
          <span class="">Actions</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="px-4 py-3 font-medium text-gray-900">{{ user.username }}</td>
        <td class="flex items-center mt-3">
          {{ user.status }}
          <svg
            v-if="user.status === 'active'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 text-green-600 ml-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <svg
            v-else-if="user.status === 'locked'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 text-red-500 ml-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </td>
        <td>
          {{ new Date(user.createdAt).toLocaleDateString() }}
        </td>
        <td>
          <div class="">
            <button
              v-if="user.status === 'locked'"
              class="mr-3 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
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
              class="mr-6 inline-flex items-center rounded-md bg-yellow-400 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-green-600/20"
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
            <button
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
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
