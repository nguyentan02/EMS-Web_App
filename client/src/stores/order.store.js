import { defineStore } from "pinia";
import orderService from "@/services/order.service";
import { ref } from "vue";

export const orderStore = defineStore("order", () => {
  const err = ref(null);
  const result = ref(null);
  const order = ref(null);
  const quantity = ref(null);
  const createOrder = async (data) => {
    err.value = null;
    order.value = null;
    try {
      let res = await orderService.createOrder(data);
      if (res.code !== 201) throw new Error(res.message);
      order.value = res;
    } catch (error) {
      err.value = error.message;
    }
  };
  const getMaterialQuantity = async () => {
    err.value = null;
    result.value = null;
    quantity.value = null;

    try {
      let res = await orderService.getQuantity();
      if (res.code !== 201) throw new Error(res.message);
      return (quantity.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  const updateOrder = async (id) => {
    err.value = null;
    result.value = null;
    try {
      let res = await orderService.updateOrder(id);
      if (res.code !== 201) throw new Error(res.message);
      return (result.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  const getOrderMater = async () => {
    err.value = null;
    result.value = null;
    try {
      let res = await orderService.getOrder();

      //   if (res.code !== 201) throw new Error(res.message);
      return (result.value = res);
    } catch (error) {
      err.value = error.message;
    }
  };
  const getOrderMaterById = async (id) => {
    err.value = null;
    result.value = null;
    try {
      let res = await orderService.getOrderById(id);
      console.log(res);
      //   if (res.code !== 201) throw new Error(res.message);
      return (result.value = res);
    } catch (error) {
      err.value = error.message;
    }
  };
  return {
    result,
    err,
    quantity,
    getMaterialQuantity,
    getOrderMater,
    getOrderMaterById,
    createOrder,
    updateOrder,
  };
});
