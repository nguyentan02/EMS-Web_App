const express = require("express");
const orderController = require("../controllers/order.controller");
const { Router } = require("express");
const router = Router();

router.post("/create", orderController.createOrder);
router.get("/", orderController.getOrder);
router.put("/:id", orderController.updateOrder);
router.get("/checkQuantity", orderController.checkQuantityMaterial);
router.get("/:id", orderController.getOrderById);
module.exports = router;
