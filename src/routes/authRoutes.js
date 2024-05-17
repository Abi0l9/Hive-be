const express = require("express");
const {
  loginUser,
  registerUser,
  verifyUser,
} = require("../controllers/authController");

const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .patch("/verify", verifyUser);

module.exports = router;
