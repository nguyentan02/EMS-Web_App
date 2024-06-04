const express = require("express");
const locationController = require("../controllers/location.controller");
const { Router } = require("express");
const router = Router();

router.post("/createDep", locationController.createDmp);
router.get("/deparments", locationController.getDeparments);
router.put("/updateDep", locationController.updateDeparment);

router.post("/createRoom", locationController.createRoom);
router.get("/rooms", locationController.getRooms);
module.exports = router;
