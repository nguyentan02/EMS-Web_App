import { defineStore } from "pinia";
import deviceService from "@/services/device.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const deviceStore = defineStore("device", () => {
  const router = useRouter();
  const err = ref(null);
  const result = ref(null);
  const devices = ref(null);
  const createDeive = async (data) => {
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
  const getAllDevices = async () => {
    err.value = null;
    devices.value = null;
    try {
      let res = await deviceService.getAllDevices();
      if (res.code !== 200) throw new Error(res.message);
      return (devices.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  const updateDevice = async (data) => {
    err.value = null;
    result.value = null;
    try {
      let update = await deviceService.updateDevice(data);
      if (update.code !== 201) throw new Error(update.message);
      result.value = update;
    } catch (error) {
      err.value = error.message;
    }
  };
  const tranferDevice = async (data) => {
    err.value = null;
    result.value = null;
    try {
      let update = await deviceService.transferDevice(data);
      if (update.code !== 201) throw new Error(update.message);
      result.value = update;
    } catch (error) {
      err.value = error.message;
      console.log(err.value);
    }
  };
  const getHistoryTrans = async () => {
    err.value = null;
    devices.value = null;
    try {
      let res = await deviceService.historyTrans();
      // console.log(res);
      if (res.code !== 201) throw new Error(res.message);
      return (devices.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  return {
    result,
    err,
    getAllDevices,
    updateDevice,
    createDeive,
    tranferDevice,
    getHistoryTrans,
  };
});
