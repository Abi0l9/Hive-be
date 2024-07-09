const router = require("express").Router();
const jobGets = require("../controllers/company/job/get");

router.get("", jobGets.getAllJobs).get("/jobId", jobGets.getOneJob);

module.exports = router;
