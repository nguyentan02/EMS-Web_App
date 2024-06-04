const userRouter = require("./user.router");
const { Router } = require("express");
const locationRouter = require("./location.router");
const router = Router();

router.use("/auth", userRouter);
router.use("/location", locationRouter);

module.exports = router;
