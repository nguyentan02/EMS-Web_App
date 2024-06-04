<template>
  <div class="w-srceen h-screen flex">
    <div class="w-[300px] h-full bg-gray-100">
      <div class="h-[50px] bg-sky-800 flex items-center justify-center">
        <span
          class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-white relative inline-block"
        >
          <routerLink :to="{ name: 'users' }"
            ><span class="relative text-gray font-bold px-4"
              >EMS</span
            ></routerLink
          >
        </span>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
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
      </div>
    </div>
    <div class="w-full h-full bg-gray-100">
      <div
        class="h-[50px] bg-sky-800 flex items-center justify-end pr-5 group cursor-pointer"
      >
        <Menu as="div" class="relative ml-3">
          <div>
            <MenuButton
              class="relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <p class="text-center text-base text-white pl-2 mr-2">
                Xin chào, {{ userStore.nameFilter() }}
              </p>
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full"
                src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg"
                alt=""
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
      <div class="h-[calc(100vh-50px)] bg-white">
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

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
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
</script>
