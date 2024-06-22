const {
  getOneUser,
  getUserEducation,
  getUserWork,
  getUserDocs,
  getBestJobMatches,
} = require("../../controllers/user/get");
const {
  updatePersonalInfo,
  updateUserPassword,
  updateUserDocuments,
  updateUserEducation,
  updateUserWork,
  switchUserMode,
} = require("../../controllers/user/patch");

const {
  deleteUserDocuments,
  deleteUserEducation,
  deleteUserWork,
} = require("../../controllers/user/delete");

const { applyForJob } = require("../../controllers/user/post");

const { addCompany } = require("../../controllers/company/patch");

const router = require("express").Router();

router
  .get("", getOneUser)
  .get("/education", getUserEducation)
  .get("/work", getUserWork)
  .get("/document", getUserDocs)
  .get("/jobs/best_match", getBestJobMatches);

router.post("/jobs/:jobId/apply", applyForJob);

router
  .patch("/information", updatePersonalInfo)
  .patch("/password", updateUserPassword)
  .patch("/educations", updateUserEducation)
  .patch("/works", updateUserWork)
  .patch("/documents", updateUserDocuments)
  .patch("/company", addCompany)
  .patch("/switch/:mode", switchUserMode);

router
  .delete("/educations/:eduId", deleteUserEducation)
  .delete("/works/:workId", deleteUserWork)
  .delete("/documents/:docId", deleteUserDocuments);

module.exports = router;
