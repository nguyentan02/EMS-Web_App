const express = require("express");
const categoryController = require("../controllers/category.controller");
const { Router } = require("express");
const router = Router();

router.post("/createCateogry", categoryController.createdCategory);
router.get("/getAllCategory", categoryController.getCate);
router.put("/updateCateogry/:id", categoryController.updateCate);
router.delete("/deleteCategory/:id", categoryController.deleteCate);
module.exports = router;
