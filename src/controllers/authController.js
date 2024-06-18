const { User } = require("../models/User");
const { errorMsgHandler } = require("../utils/handlers/errorMsgHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  verificationCodeHandler,
} = require("../utils/handlers/verficationCodeHandler");
const { SECRET } = require("../utils/config");
const sendVerificationCode = require("../utils/mailing/sendVerificationCode");
const sendRegCongrats = require("../utils/mailing/sendRegCongrats");

const registerUser = async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const verificationCode = verificationCodeHandler();

    const newUser = new User({ ...body, passwordHash, verificationCode });

    await newUser.save();

    await sendVerificationCode({
      user: body.first_name,
      email,
      code: verificationCode,
    });

    return res.status(201).json({ message: "user successfully registered." });
  } catch (e) {
    const error = errorMsgHandler(e);
    return res.status(400).json({ error });
  }
};

const loginUser = async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!userExists.isVerified) {
      return res.status(403).json({ error: "Please, activate your account." });
    }

    const passwordHash = userExists.passwordHash;
    const isCorrect = (await bcrypt.compare(password, passwordHash)) || null;

    if (!isCorrect) {
      return res.status(400).json({ error: "Incorrect email/password" });
    }

    const payload = {
      id: userExists.id,
      email: userExists.email,
    };
    const token = jwt.sign(payload, SECRET);

    return res.status(200).json({
      message: "user logged successfully.",
      token,
      lastMode: userExists.lastMode,
    });
  } catch (e) {
    const error = errorMsgHandler(e);
    return res.status(400).json({ error });
  }
};

const verifyUser = async (req, res) => {
  const body = req.body;
  const { verificationCode, email } = body;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    if (userExists.verificationCode !== verificationCode) {
      return res.status(400).json({ error: " Verification code is invalid" });
    }

    userExists.isVerified = true;
    await userExists.save();

    await sendRegCongrats({
      user: userExists.first_name,
      email,
    });

    return res.status(200).json({ message: "User successfully verified." });
  } catch (e) {
    const error = errorMsgHandler(e);
    return res.status(400).json({ error });
  }
};

const sendPwdVerificationCode = async (req, res) => {
  const body = req.body;
  const { email } = body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      await userExists.save();

      const verificationCode = verificationCodeHandler();

      userExists.forgotPwdCode = verificationCode;
      await sendVerificationCode({
        user: userExists.first_name,
        email,
        code: verificationCode,
      });
      await userExists.save();
    }
    return res.status(200).json({ message: "Verification code sent." });
  } catch (e) {
    const error = errorMsgHandler(e);
    return res.status(400).json({ error });
  }
};

const confirmVerificationCode = async (req, res) => {
  const body = req.body;
  const { verificationCode, email } = body;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    if (userExists.forgotPwdCode !== verificationCode) {
      return res.status(400).json({ error: " Verification code is invalid" });
    }

    userExists.isVerified = true;
    await userExists.save();

    return res.status(200).json({ message: "code verified." });
  } catch (e) {
    const error = errorMsgHandler(e);
    return res.status(400).json({ error });
  }
};

const resetUserPwd = async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    userExists.passwordHash = passwordHash;

    await userExists.save();

    return res.status(200).json({
      message: "Account recovered, successfully.",
    });
  } catch (e) {
    const error = errorMsgHandler(e);
    return res.status(400).json({ error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  sendPwdVerificationCode,
  confirmVerificationCode,
  resetUserPwd,
};
