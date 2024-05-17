const {
  getOneUser,
  getUserEducation,
  getUserWork,
  getUserDocs,
} = require("../../controllers/user/get");
const {
  updatePersonalInfo,
  updateUserPassword,
} = require("../../controllers/user/patch");

const router = require("express").Router();

router
  .patch("/:userId/information", updatePersonalInfo)
  .patch("/:userId/password", updateUserPassword)
  .get("/:userId", getOneUser)
  .get("/:userId/education", getUserEducation)
  .get("/:userId/work", getUserWork)
  .get("/:userId/document", getUserDocs);

module.exports = router;
