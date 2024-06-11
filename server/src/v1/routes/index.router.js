const userRouter = require("./user.router");
const { Router } = require("express");
const locationRouter = require("./location.router");
const categoryRouter = require("./category.router");
const deviceRouter = require("./device.router");
const usageRouter = require("./usage.router");
const router = Router();

router.use("/auth", userRouter);
router.use("/location", locationRouter);
router.use("/category", categoryRouter);
router.use("/device", deviceRouter);
router.use("/usage", usageRouter);
module.exports = router;
