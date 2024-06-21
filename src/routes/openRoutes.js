const router = require("express").Router();
const openCalls = require("../controllers/openCalls");

router.get("/jobs", openCalls.getAllJobs);

module.exports = router;
