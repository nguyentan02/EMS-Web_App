import { defineStore } from "pinia";
import usageService from "@/services/usage.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const usageStore = defineStore("usage", () => {
  const router = useRouter();
  const err = ref(null);
  const result = ref(null);
  const usage = ref(null);
  const code = ref(null);
  const createUsage = async (data) => {
    err.value = null;
    result.value = null;
    code.value = null;
    try {
      let create = await usageService.createUsage(data);
      if (create.code !== 201) throw new Error(create.code);
      result.value = create;
    } catch (error) {
      err.value = error.message;
    }
  };
  const updateUsage = async (data) => {
    err.value = null;
    result.value = null;
    try {
      let update = await usageService.updateUsage(data);
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
  const getAllUsagesTrue = async () => {
    err.value = null;
    usage.value = null;
    try {
      let res = await usageService.getAllUsageTrue();
      if (res.code !== 201) throw new Error(res.message);
      return (usage.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  const deleteUsage = async (id) => {
    err.value = null;
    result.value = null;
    try {
      console.log(id);
      let res = await usageService.deleteUsage(id);
      if (res.code !== 201) throw new Error(res.message);
      result.value = res;
    } catch (error) {
      err.value = error.message;
    }
  };

  return {
    createUsage,
    result,
    err,
    getAllUsages,
    updateUsage,
    deleteUsage,
    getAllUsagesTrue,
  };
});
