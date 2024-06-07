const express = require("express");
const userController = require("../controllers/user.controller");
const { Router } = require("express");
const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/allUsers", userController.getAllUsers);
router.put("/unlock", userController.unlockUsers);
router.put("/lock", userController.lockUser);

router.delete("/delete/:id", userController.deleteUser);
module.exports = router;
