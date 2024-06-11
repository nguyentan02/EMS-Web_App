import { defineStore } from "pinia";
import usageService from "@/services/usage.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const usageStore = defineStore("usage", () => {
  const router = useRouter();
  const err = ref(null);
  const result = ref(null);
  const usage = ref(null);
  const createUsage = async (data) => {
    err.value = null;
    result.value = null;
    try {
      let update = await deviceService.createDevice(data);
      if (update.code !== 201) throw new Error(update.message);
      result.value = update;
    } catch (error) {
      err.value = error.message;
    }
  };
  const getAllUsages = async () => {
    err.value = null;
    usage.value = null;
    try {
      let res = await usageService.getAllUsage();
      if (res.code !== 201) throw new Error(res.message);
      return (usage.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  return {
    createUsage,
    result,
    err,
    getAllUsages,
  };
});
