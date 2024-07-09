const express = require("express");
const {
  loginUser,
  registerUser,
  verifyUser,
  sendPwdVerificationCode,
  confirmVerificationCode,
  resetUserPwd,
} = require("../controllers/authController");

const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/password/send_code", sendPwdVerificationCode)
  .post("/password/confirm_code", confirmVerificationCode);

router.patch("/verify", verifyUser).patch("/password/reset", resetUserPwd);

module.exports = router;
