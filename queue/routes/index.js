const { Router } = require("express");
const jobs = require("./jobs");

const router = Router();

router.use(jobs);

module.exports = router;
