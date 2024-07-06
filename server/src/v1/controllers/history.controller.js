const ApiRes = require("../utils/api-res");
const ApiError = require("../utils/api-error");
const HistoryService = require("../services/history.service");

module.exports = {
  getUsageHistory: async (req, res, next) => {
    const historyService = new HistoryService();
    const get = await historyService.getUsageHistory();
    return res.json(get);
  },
  getMaintenanDevice: async (req, res, next) => {
    const historyService = new HistoryService();
    const get = await historyService.getMaintenanDevice();
    return res.json(get);
  },
};
