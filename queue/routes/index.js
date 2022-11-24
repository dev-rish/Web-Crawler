const { Router } = require("express");
const jobs = require("./jobs");
const { dashboardRoutes } = require("./dashboard");

const router = Router();

router.use(jobs);
router.use(dashboardRoutes);

module.exports = router;
