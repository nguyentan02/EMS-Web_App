const express = require("express");
const usageController = require("../controllers/usageHistory.controller");
const { Router } = require("express");
const { route } = require("./device.router");
const router = Router();

router.post("/create", usageController.createUsing);
router.put("/update", usageController.updateUsing);
router.delete("/delete/:id", usageController.deleteUsing);
router.get("/getAll", usageController.getAllUsing);

router.get("/getAllTrue", usageController.getAllUsingTrue);
module.exports = router;
