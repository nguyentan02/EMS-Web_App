const transactionController = require("../controllers/transaction.controller");
const { Router } = require("express");
const router = Router();

router.get("/All", transactionController.getAll);
router.get("/:id", transactionController.getTrans);

module.exports = router;
