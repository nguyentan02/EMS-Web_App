import { defineStore } from "pinia";
import materialService from "@/services/material.service";
import { ref } from "vue";

export const materialStore = defineStore("material", () => {
  const err = ref(null);
  const result = ref(null);
  const material = ref(null);
  const createMaterial = async (data) => {
    err.value = null;
    result.value = null;
    try {
      let res = await materialService.createMaterial(data);
      if (res.code !== 201) throw new Error(res.message);
      result.value = res;
    } catch (error) {
      err.value = error.message;
    }
  };
  const updateMaterial = async (data) => {
    err.value = null;
    result.value = null;
    try {
      let update = await materialService.updateMaterial(data);

      if (update.code !== 201) throw new Error(update.message);
      result.value = update;
    } catch (error) {
      err.value = error.message;
    }
  };
  const deletedMaterial = async (id) => {
    err.value = null;
    result.value = null;
    try {
      let deleted = await materialService.deleteMaterial(id);
      if (deleted.code !== 201) throw new Error(deleted.message);
      result.value = deleted;
    } catch (error) {
      err.value = error.message;
    }
  };
  const getMaterial = async () => {
    err.value = null;
    material.value = null;
    try {
      let testr = await materialService.getMaterial();

      return (material.value = testr.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  const getMaterialById = async (id) => {
    err.value = null;
    material.value = null;
    try {
      let testr = await materialService.getMaterialById(id);
      console.log(testr);
      return (material.value = testr.data);
    } catch (error) {
      err.value = error.message;
    }
  };

  return {
    result,
    err,
    getMaterial,
    createMaterial,
    updateMaterial,
    deletedMaterial,
    getMaterialById,
  };
});
