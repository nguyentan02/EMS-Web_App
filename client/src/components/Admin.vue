<template>
  <div class="relative flex min-h-screen">
    <div class="bg-cyan-700 text-cyan-100 w-64" v-show="showSide">
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
            :to="{ name: 'users' }"
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
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            Quản lý tài khoản</router-link
          >
        </div>
      </nav>
    </div>
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
      <div class="p-8 text-cyan-700 font-extralight">
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
import { ref } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { FwbAvatar } from "flowbite-vue";
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const $toast = useToast();
import { onMounted } from "vue";
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
