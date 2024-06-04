<template>
  <div class="w-srceen h-screen flex">
    <div class="w-[300px] h-full bg-gray-100">
      <div class="h-[50px] bg-sky-800 flex items-center justify-center">
        <!-- <span class="text-xl bg-red-400 mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-hospital"
            viewBox="0 0 16 16"
          >
            <path
              d="M8.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1zM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25z"
            />
            <path
              d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1zm2 14h2v-3H7zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zm0-14H6v1h4zm2 7v7h3V8zm-8 7V8H1v7z"
            />
          </svg>
        </span> -->
        <span
          class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-white relative inline-block"
        >
          <routerLink :to="{ name: 'test' }"
            ><span class="relative text-gray font-bold px-4"
              >EMS</span
            ></routerLink
          >
        </span>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
        <div class="flex flex-col space-y-[10px]">
          <router-link
            :to="{ name: 'test' }"
            class="text-white inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-database-check mr-2 w-[25px] h-[25px]"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514"
              />
              <path
                d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"
              />
            </svg>
            Quản lý thiết bị</router-link
          >
        </div>
        <div class="flex flex-col space-y-[10px]">
          <router-link
            :to="{ name: 'test1' }"
            class="text-white inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-database-check mr-2 w-[25px] h-[25px]"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514"
              />
              <path
                d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"
              />
            </svg>
            Quản lý danh mục</router-link
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
                src="data:image/png;base64,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"
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
