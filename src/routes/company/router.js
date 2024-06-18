const router = require("express").Router();
const patches = require("../../controllers/company/patch");
const gets = require("../../controllers/company/get");
const deletes = require("../../controllers/company/delete");

const jobsPost = require("../../controllers/company/job/post");
const jobsGets = require("../../controllers/company/job/get");
const jobsDelete = require("../../controllers/company/job/delete");
const jobsPatches = require("../../controllers/company/job/patch");

router
  .get("/me", gets.getUserCompany)
  .get("/me/documents", gets.getMyCompanyDocuments)
  .get("/me/jobs", jobsGets.getMyCompanyJobs);

//other companies
router
  .get("/:companyId", gets.getOneCompany)
  .get("/:companyId/jobs", gets.getCompanyJobs);

router.post("/me/jobs", jobsPost.addNewJob);

router
  .patch("/me/information", patches.updateCompanyInfo)
  .patch("/me/documents", patches.updateCompanyDocument)
  .patch("/me/jobs/:jobId", jobsPatches.updateMyCompanyJob);

router
  .delete("/me/documents/:docId", deletes.deleteMyCompanyDocuments)
  .delete("/me/jobs/:jobId", jobsDelete.deleteMyCompanyJob);

module.exports = router;
