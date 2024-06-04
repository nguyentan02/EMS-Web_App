import { defineStore } from "pinia";
import { ref } from "vue";
// import userService from "../services/user.service";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const err = ref(null);
  const result = ref(null);

  const clearSession = () => {
    sessionStorage.removeItem("user");
  };

  const nameFilter = () => {
    const getSet = sessionStorage.getItem("user");
    const getname = JSON.parse(getSet).user.username;
    return getname;
  };
  const roleFilter = () => {
    const getSet = sessionStorage.getItem("user");
    const getrole = JSON.parse(getSet).user.role;
    return getrole;
  };
  return { user, result, err, clearSession, nameFilter, roleFilter };
});
