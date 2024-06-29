import { defineStore } from "pinia";
import maintenanceService from "@/services/maintenance.service";
import { ref } from "vue";

export const usemaintenanceStore = defineStore("maintenance", () => {
  const err = ref(null);
  const result = ref(null);
  const inventorys = ref([]);

  const createMaintenance = async (data) => {
    err.value = null;
    result.value = null;
    try {
      let res = await maintenanceService.createMaintanance(data);
      if (res.code !== 201) throw new Error(res.message);
      result.value = res;
    } catch (error) {
      err.value = error.message;
    }
  };
  const updateMaint = async (data) => {
    err.value = null;
    result.value = null;
    try {
      console.log(data);
      let res = await maintenanceService.updateMaintenance(data);
      if (res.code !== 201) throw new Error(res.message);
      result.value = res;
    } catch (error) {
      err.value = error.message;
    }
  };
  const deletedItem = async (id) => {
    err.value = null;
    result.value = null;
    try {
      let res = await maintenanceService.deleteMaterial(id);
      if (res.code !== 201) throw new Error(res.message);
      result.value = res;
    } catch (error) {
      err.value = error.message;
    }
  };
  const deletedMaintenance = async (id) => {
    err.value = null;
    result.value = null;
    try {
      let res = await maintenanceService.deleteMaintenance(id);
      if (res.code !== 201) throw new Error(res.message);
      result.value = res;
    } catch (error) {
      err.value = error.message;
    }
  };
  const getMaintenance = async () => {
    err.value = null;
    result.value = null;
    try {
      let res = await maintenanceService.getMaintenace();
      if (res.code !== 201) throw new Error(res.message);
      return (result.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };

  const getInventoy = async () => {
    err.value = null;
    inventorys.value = null;
    try {
      let res = await maintenanceService.getInventory();
      return (inventorys.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  const getStatus = async () => {
    err.value = null;
    result.value = null;
    try {
      let res = await maintenanceService.getStatus();
      return (result.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };

  return {
    result,
    err,
    inventorys,
    createMaintenance,
    getMaintenance,
    getInventoy,
    updateMaint,
    deletedItem,
    deletedMaintenance,
    getStatus,
  };
});
