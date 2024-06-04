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
        path: "test1",
        name: "test1",
        component: () => import("../components/Test1.vue"),
      },
      {
        path: "test",
        name: "test",
        component: () => import("../components/Test.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
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