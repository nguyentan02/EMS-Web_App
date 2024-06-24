const express = require("express");
const materialController = require("../controllers/material.controller");
const { Router } = require("express");
const multerUpload = require("../middleware/image.middleware");
const router = Router();

router.post("/create", multerUpload, materialController.createMaterial);
router.put("/update", multerUpload, materialController.updateMaterial);
router.get("/", materialController.getMaterial);
router.get("/:id", materialController.getMaterialById);
router.delete("/:id", materialController.deleteMaterial);

module.exports = router;
