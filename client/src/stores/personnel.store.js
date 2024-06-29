import { defineStore } from "pinia";
import personnelService from "@/services/personnel.service";
import { ref } from "vue";

export const usePersonnelStore = defineStore("personnel", () => {
  const err = ref(null);
  const result = ref(null);
  const personnel = ref(null);
  const getPersonnel = async () => {
    err.value = null;
    personnel.value = null;

    try {
      let res = await personnelService.getPersonnel();
      if (res.code !== 201) throw new Error(res.message);
      return (personnel.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  return { err, result, personnel, getPersonnel };
});
