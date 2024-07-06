<template>
  <div class="relative flex min-h-screen">
    <div
      class="bg-cyan-700 text-cyan-100 w-56 inset-y-0 left-0 md:relative md:-translate-x-0 transform -translate-x-full transition duration-200 ease-in-out"
      v-show="showSide"
    >
      <a class="flex items-center justify-center" href=""
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-10 w-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
          />
        </svg>
        <span class="text-2xl font-extrabold">EMS</span>
      </a>
      <nav class="mt-4">
        <div class="flex flex-col space-y-[10px]">
          <router-link
            active-class="active-link"
            :to="{ name: 'test' }"
            class="text-white inline-flex relative items-center py-[10px] px-[10px] w-full text-base font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>

            Quản lý thiết bị</router-link
          >
          <router-link
            :to="{ name: 'Using' }"
            active-class="active-link"
            class="text-white inline-flex relative items-center py-[10px] px-[10px] w-full text-base font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
              />
            </svg>

            Quản lý sử dụng</router-link
          >
          <router-link
            :to="{ name: 'transfer' }"
            active-class="active-link"
            class="text-white inline-flex relative items-center py-[10px] px-[10px] w-full text-base font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            Luân chuyển thiết bị</router-link
          ><router-link
            :to="{ name: 'maintenance' }"
            active-class="active-link"
            class="text-white inline-flex relative items-center py-[10px] px-[10px] w-full text-base font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
            Bảo trì, sửa chữa</router-link
          >
          <Material />
          <dropDown />
          <router-link
            active-class="active-link"
            :to="{ name: 'statistical' }"
            class="text-white inline-flex relative items-center py-[10px] px-[10px] w-full text-base font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
              />
            </svg>

            Thống kê dữ liệu</router-link
          >
        </div>
      </nav>
    </div>
    <!-- test -->
    <div class="flex-1">
      <div class="bg-white shadow px-2 py-4">
        <button class="text-cyen-600" @click="toggleSideBar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-8 w-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <Menu as="div" class="relative ml-3 float-right">
          <div>
            <MenuButton
              class="relative flex items-center rounded-full bg-teal-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <div class="flex flex-col">
                <p class="text-center text-base text-white px-4 mr-2">
                  {{ userStore.nameFilter() }}
                </p>
                <div class="text-[#fbbf24] font">
                  {{ userStore.roleFilter() }}
                </div>
              </div>

              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <fwb-avatar
                img=""
                rounded
                status-position="top-right"
                status="online"
              />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <a
                  @click="submitLogout"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >Đăng xuất</a
                >
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <div class="p-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { useUserStore } from "../stores/user.store";
import { useAuthStore } from "../stores/auth.store";
import dropDown from "../components/DropDown.vue";
import Material from "../components/MaterialDropDown.vue";
import { ref } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  FwbAvatar,
  FwbDropdown,
  FwbListGroup,
  FwbListGroupItem,
} from "flowbite-vue";
import { onMounted } from "vue";

function toggleDropdown() {
  let dropdownbtn = document.querySelector("#dropdownButton #dropdown");
  console.log(dropdownbtn);
  dropdownbtn.classList.toggle("hidden");
}
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const $toast = useToast();

onMounted(() => {
  setInterval(() => {
    authStore.checkToken();
  }, 60000);
});
const submitLogout = async () => {
  await authStore.logout();
  if (authStore.err) {
    $toast.error(authStore.err, { position: "top-right" });
    return;
  }
  userStore.clearSession();
  router.push({ name: "login" });
};

const showSide = ref(true);

function toggleSideBar() {
  showSide.value = !showSide.value;
}
</script>
<style>
/* Active link styling */
.active-link {
  background-color: #89a8a1; /* Example - customize as needed */
  font-weight: bold;
}

/* ...your other styles ... */
</style>
