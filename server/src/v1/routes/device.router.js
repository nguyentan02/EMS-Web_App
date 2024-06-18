const express = require("express");
const deviceController = require("../controllers/devices.controller");
const { Router } = require("express");
const router = Router();

router.post("/createDevice", deviceController.createDevice);
router.get("/getDevices", deviceController.getAllDevices);
router.get("/getNoActive", deviceController.getAllDevicesNoActive);
router.get("/getActive", deviceController.getAllDeviceActive);

router.put("/update", deviceController.updateDevice);
router.put("/transfer", deviceController.transferData);
router.get("/histransfer", deviceController.getHistoryTran);

router.delete("/:id", deviceController.deleteDevice);
module.exports = router;
