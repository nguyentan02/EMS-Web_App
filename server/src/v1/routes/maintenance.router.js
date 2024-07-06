// const express = require("express");
const maintenanceController = require("../controllers/maintenance.controller");
const historyController = require("../controllers/history.controller");
const { Router } = require("express");
const router = Router();

router.post("/create", maintenanceController.createMaintenance);
router.put("/update", maintenanceController.updateStatus);
router.delete("/:id", maintenanceController.deletedMaterialItem);
router.delete("/deleted/:id", maintenanceController.deletedMaintenance);

router.get("/", maintenanceController.getMaintenance);
router.get("/historyMain", historyController.getMaintenanDevice);
router.get("/inventory", maintenanceController.getInventory);
router.get("/status", maintenanceController.getStatus);
module.exports = router;
