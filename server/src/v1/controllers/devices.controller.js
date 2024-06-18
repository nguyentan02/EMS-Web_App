const DeviceService = require("../services/device.service");

const ApiRes = require("../utils/api-res");
const ApiError = require("../utils/api-error");

module.exports = {
  createDevice: async (req, res, next) => {
    try {
      const deviceService = new DeviceService();
      const {
        name,
        model,
        serial,
        manufac,
        purchase,
        price,
        status_id,
        category_id,
        location_id,
      } = req.body;

      const createdDevice = await deviceService.createDevice(
        name,
        model,
        serial,
        manufac,
        purchase,
        price,
        status_id,
        category_id,
        location_id
      );
      return res.json(createdDevice);
    } catch (error) {}
  },
  updateDevice: async (req, res, next) => {
    try {
      const deviceService = new DeviceService();
      const {
        id,
        name,
        model,
        serial,
        manufac,
        purchase,
        price,
        status_id,
        category_id,
        location_id,
      } = req.body;

      const updatedDevice = await deviceService.updateDevice(
        id,
        name,
        model,
        serial,
        manufac,
        purchase,
        price,
        status_id,
        category_id,
        location_id
      );

      return res.json(updatedDevice);
    } catch (error) {
      console.log(error);
    }
  },
  getAllDevices: async (req, res, next) => {
    try {
      const deviceService = new DeviceService();
      const getDevices = await deviceService.getAllDevice();
      return res.json(getDevices);
    } catch (error) {
      console.log(error);
    }
  },
  getAllDevicesNoActive: async (req, res, next) => {
    try {
      const deviceService = new DeviceService();
      const getNoActive = await deviceService.getAllDeviceNoActive();
      return res.json(getNoActive);
    } catch (error) {
      console.log(error);
    }
  },
  getAllDeviceActive: async (req, res, next) => {
    try {
      const deviceService = new DeviceService();
      const getActive = await deviceService.getAllDeviceActive();
      return res.json(getActive);
    } catch (error) {
      console.log(error);
    }
  },
  deleteDevice: async (req, res, next) => {
    try {
      const deviceService = new DeviceService();
      const { id } = req.params;
      const deleteDevice = await deviceService.deleteDevice(id);
      return res.json(deleteDevice);
    } catch (error) {}
  },
  transferData: async (req, res, next) => {
    try {
      const deviceService = new DeviceService();
      const { id, locationId } = req.body;
      console.log(id, locationId);
      const tranfer = await deviceService.transferDevice(id, locationId);
      return res.json(tranfer);
    } catch (error) {
      console.log(error);
    }
  },
  getHistoryTran: async (req, res, next) => {
    try {
      const deviceService = new DeviceService();
      const history = await deviceService.getHistoryTransfer();
      return res.json(history);
    } catch (error) {}
  },
};
