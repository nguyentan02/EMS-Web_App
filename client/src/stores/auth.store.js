import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { useUserStore } from "../stores/user.store";
import authService from "../services/auth.service";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const router = useRouter();
    const userStore = useUserStore();
    const { cookies } = useCookies();
    const err = ref(null);
    const result = ref(null);
    const user = ref(null);
    const users = ref(null);
    const register = async (data) => {
      err.value = null;
      result.value = null;
      try {
        let res = await authService.register(data);
        console.log(res);
        if (res.code !== 201) throw new Error(res.message);
        result.value = res;
      } catch (error) {
        err.value = error.message;
      }
    };
    const login = async (data) => {
      err.value = null;
      result.value = null;
      user.value = null;
      try {
        let res = await authService.login(data);
        if (res.code !== 200) throw new Error(res.message);
        result.value = res;
        user.value = res.data.user;
      } catch (error) {
        err.value = error.message;
      }
    };

    const logout = async () => {
      err.value = null;
      result.value = null;
      try {
        let res = await authService.logout();
        if (res.code !== 200) throw new Error(res.message);
        result.value = res;
      } catch (error) {
        err.value = error.message;
      }
    };
    const lockUser = async (id) => {
      err.value = null;
      result.value = null;
      try {
        let res = await authService.lockUser(id);
        if (res.code !== 200) throw new Error(res.message);
        result.value = res;
      } catch (error) {
        err.value = error.message;
      }
    };
    const unLockUser = async (id) => {
      err.value = null;
      result.value = null;
      try {
        let res = await authService.unLockUser(id);
        if (res.code !== 200) throw new Error(res.message);
        result.value = res;
      } catch (error) {
        err.value = error.message;
      }
    };
    const getUsers = async () => {
      err.value = null;
      result.value = null;
      users.value = null;
      try {
        let getUsers = await authService.getUsers();

        if (getUsers.code !== 200) throw new Error(res.message);
        return (users.value = getUsers.data);
      } catch (error) {
        err.value = error.message;
      }
    };

    const checkToken = () => {
      const token = cookies.get("token");

      if (token) {
        const decoded = jwtDecode(token);

        if (decoded.exp < Date.now() / 1000) {
          cookies.remove("token");
          userStore.clearSession();
          router.push({ name: "login" });
        }
      } else {
        router.push({ name: "login" });
        userStore.clearSession();
      }
    };
    return {
      err,
      result,
      user,
      login,
      logout,
      checkToken,
      getUsers,
      lockUser,
      unLockUser,
      register,
    };
  },
  {
    persist: {
      key: "user",
      paths: ["user"],
      storage: sessionStorage,
    },
  }
);
