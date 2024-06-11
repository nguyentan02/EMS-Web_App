const ApiRes = require("../utils/api-res");
const ApiError = require("../utils/api-error");
const UsageHistoryService = require("../services/usageHistory.service");

module.exports = {
  createUsing: async (req, res, next) => {
    const usageHistoryService = new UsageHistoryService();
    const { deviceId, user, roomId, usage_start, usage_end, purpose } =
      req.body;
    console.log(deviceId, user, roomId, usage_start, usage_end, purpose);
    const created = await usageHistoryService.createUsing(
      deviceId,
      user,
      roomId,
      usage_start,
      usage_end,
      purpose
    );
    return res.json(created);
  },
  updateUsing: async (req, res, next) => {
    try {
      const usageHistoryService = new UsageHistoryService();
      const { idUsage, user, usage_start, usage_end, purpose } = req.body;
      console.log(idUsage, user, usage_start, usage_end, purpose);
      const updated = await usageHistoryService.updateUsing(
        idUsage,
        user,
        usage_start,
        usage_end,
        purpose
      );
      return res.json(updated);
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  },
  getAllUsing: async (req, res, next) => {
    try {
      const usageHistoryService = new UsageHistoryService();

      const getAll = await usageHistoryService.getAllUsing();
      return res.json(getAll);
    } catch (error) {}
    return next(new ApiError(500, error.message));
  },
  deleteUsing: async (req, res, next) => {
    try {
      const usageHistoryService = new UsageHistoryService();
      const { id } = req.params;
      const deleted = await usageHistoryService.deleteUsing(id);
      return res.json(deleted);
    } catch (error) {
      console.log(error);
    }
  },
};
