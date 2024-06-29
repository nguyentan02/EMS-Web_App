const ApiRes = require("../utils/api-res");
const ApiError = require("../utils/api-error");

const TransactionService = require("../services/transaction.service");

module.exports = {
  getTrans: async (req, res, next) => {
    const transactionService = new TransactionService();
    const { id } = req.params;
    const get = await transactionService.getTransaction(id);
    return res.json(get);
  },
  getAll: async (req, res, next) => {
    const transactionService = new TransactionService();
    const get = await transactionService.getAllTransactionQuantities();
    return res.json(get);
  },
};
