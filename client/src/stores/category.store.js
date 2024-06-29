import { defineStore } from "pinia";
import categoryService from "@/services/category.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const cateStore = defineStore("category", () => {
  const router = useRouter();
  const err = ref(null);
  const result = ref(null);

  const getCate = async () => {
    err.value = null;
    result.value = null;
    try {
      let testr = await categoryService.getCate();
      const category = testr.map((res) => ({
        value: res.id,
        name: res.name,
      }));

      return category;
    } catch (error) {
      err.value = error.message;
    }
  };
  const getDataChart = async () => {
    err.value = null;
    result.value = null;
    try {
      let testr = await categoryService.getCate();
      return (result.value = testr);
    } catch (error) {
      err.value = error.message;
    }
  };
  return { result, err, getCate, getDataChart };
});
