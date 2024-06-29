import { defineStore } from "pinia";
import transactionService from "@/services/transaction.service";
import { ref } from "vue";

export const useTransaction = defineStore("transaction", () => {
  const err = ref(null);
  const result = ref(null);
  const transactions = ref([]);
  const getTransaction = async (id) => {
    err.value = null;
    result.value = null;
    try {
      let res = await transactionService.getPersonnel(id);

      if (res.code !== 200) throw new Error(res.message);
      return (result.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  const getAll = async () => {
    err.value = null;
    transactions.value = [];
    try {
      let res = await transactionService.getAll();
      return (transactions.value = res.data);
    } catch (error) {
      err.value = error.message;
    }
  };
  return { err, result, transactions, getTransaction, getAll };
});
