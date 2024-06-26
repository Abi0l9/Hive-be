const {
  getOneUser,
  getUserEducation,
  getUserWork,
  getUserDocs,
  getBestJobMatches,
  getUserJobApplications,
  getUserBookmarkedJobs,
} = require("../../controllers/user/get");
const {
  updatePersonalInfo,
  updateUserPassword,
  updateUserDocuments,
  updateUserEducation,
  updateUserWork,
  switchUserMode,
  bookmarkAJob,
} = require("../../controllers/user/patch");

const {
  deleteUserDocuments,
  deleteUserEducation,
  deleteUserWork,
  removeABookmarkedJob,
} = require("../../controllers/user/delete");

const { applyForJob } = require("../../controllers/user/post");

const { addCompany } = require("../../controllers/company/patch");

const router = require("express").Router();

router
  .get("", getOneUser)
  .get("/education", getUserEducation)
  .get("/work", getUserWork)
  .get("/document", getUserDocs)
  .get("/jobs/best_match", getBestJobMatches)
  .get("/me/jobs/applications", getUserJobApplications)
  .get("/me/jobs/bookmarked", getUserBookmarkedJobs);

router.post("/jobs/:jobId/apply", applyForJob);

router
  .patch("/information", updatePersonalInfo)
  .patch("/password", updateUserPassword)
  .patch("/educations", updateUserEducation)
  .patch("/works", updateUserWork)
  .patch("/documents", updateUserDocuments)
  .patch("/company", addCompany)
  .patch("/switch/:mode", switchUserMode)
  .patch("/jobs/:jobId/bookmark", bookmarkAJob);

router
  .delete("/educations/:eduId", deleteUserEducation)
  .delete("/works/:workId", deleteUserWork)
  .delete("/documents/:docId", deleteUserDocuments)
  .delete("/jobs/:jobId/bookmark", removeABookmarkedJob);

module.exports = router;
