const {
  getOneUser,
  getUserEducation,
  getUserWork,
  getUserDocs,
} = require("../../controllers/user/get");
const {
  updatePersonalInfo,
  updateUserPassword,
  updateUserDocuments,
  updateUserEducation,
  updateUserWork,
} = require("../../controllers/user/patch");

const {
  deleteUserDocuments,
  deleteUserEducation,
  deleteUserWork,
} = require("../../controllers/user/delete");

const router = require("express").Router();

router
  .get("", getOneUser)
  .get("/education", getUserEducation)
  .get("/work", getUserWork)
  .get("/document", getUserDocs);

router
  .patch("/information", updatePersonalInfo)
  .patch("/password", updateUserPassword)
  .patch("/educations", updateUserEducation)
  .patch("/works", updateUserWork)
  .patch("/documents", updateUserDocuments);

router
  .delete("/educations/:eduId", deleteUserEducation)
  .delete("/works/:workId", deleteUserWork)
  .delete("/documents/:docId", deleteUserDocuments);

module.exports = router;
