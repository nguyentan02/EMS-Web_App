import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user.store";
import { useAuthStore } from "../stores/auth.store";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.user) next("login");
      next();
    },
    children: [
      {
        path: "transfer",
        name: "transfer",
        component: () => import("../components/transferVue.vue"),
      },
      {
        path: "test",
        name: "test",
        component: () => import("../components/ManagerDevice.vue"),
      },
      {
        path: "/Using",
        name: "Using",
        component: () => import("../components/UsingManager.vue"),
      },
      {
        path: "/Historytransfer",
        name: "historytransfer",
        component: () => import("../components/HistoryTransferVue.vue"),
      },
      {
        path: "/HistoryUsing",
        name: "HistoryUsing",
        component: () => import("../components/HistoryUsing.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/test11",
    name: "test11",
    component: () => import("../components/test.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/AdminView.vue"),
    children: [
      {
        path: "users",
        name: "users",
        component: () => import("../components/ManagerUser.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
