const ApiRes = require("../utils/api-res");
const ApiError = require("../utils/api-error");
const MaintenanceService = require("../services/maintenance.service");

module.exports = {
  createMaintenance: async (req, res, next) => {
    const maintenance = new MaintenanceService();
    const {
      deviceId,
      date_start,
      date_end,
      employee_code,
      cost,
      description,
      materialItem,
    } = req.body;

    const newMainten = await maintenance.createMaintenan(
      deviceId,
      date_start,
      date_end,
      employee_code,
      cost,
      description,
      materialItem
    );
    return res.json(newMainten);
  },
  updateStatus: async (req, res, next) => {
    const maintenance = new MaintenanceService();
    const data = req.body;
    console.log(data);
    const update = await maintenance.updateStatus(data);
    return res.json(update);
  },
  getMaintenance: async (req, res, next) => {
    const maintenance = new MaintenanceService();
    const get = await maintenance.getMaintenan();
    return res.json(get);
  },
  deletedMaterialItem: async (req, res, next) => {
    const maintenance = new MaintenanceService();
    const { id } = req.params;
    const deleted = await maintenance.deleteMaterialItem(id);
    return res.json(deleted);
  },
  deletedMaintenance: async (req, res, next) => {
    const maintenance = new MaintenanceService();
    const { id } = req.params;
    const deleted = await maintenance.deleteMaintenance(id);
    return res.json(deleted);
  },

  getInventory: async (req, res, next) => {
    const maintenance = new MaintenanceService();
    const get = await maintenance.getInventoy();
    return res.json(get);
  },
  getStatus: async (req, res, next) => {
    const maintenance = new MaintenanceService();
    const get = await maintenance.getStatus();
    return res.json(get);
  },
};
