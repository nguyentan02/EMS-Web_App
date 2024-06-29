const personneController = require("../controllers/personnel.controller");
const { Router } = require("express");
const router = Router();

router.get("/", personneController.getPersonnel);
module.exports = router;
