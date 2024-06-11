const router = require("express").Router();
const companyPatches = require("../../controllers/company/patch");
const companyGets = require("../../controllers/company/get");

router
  .get("/me", companyGets.getUserCompany)
  .get("/:companyId", companyGets.getOneCompany)
  .get("/:companyId/jobs", companyGets.getCompanyJobs);

router
  .patch("/information", companyPatches.updateCompanyInfo)
  .patch("/documents", companyPatches.updateCompanyDocument);
