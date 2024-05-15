const { User } = require("../models/User");
const { errorMsgHandler } = require("../utils/handlers/errorMsgHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  verificationCodeHandler,
} = require("../utils/handlers/verficationCodeHandler");
const { SECRET } = require("../utils/config");

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

    const passwordHash = userExists.passwordHash;
    const isCorrect = (await bcrypt.compare(password, passwordHash)) || null;

    if (!isCorrect) {
      return res.status(400).json({ error: "Incorrect email/password" });
    }

    const payload = { id: userExists.id, email: userExists.email };
    const token = jwt.sign(payload, SECRET);

    return res
      .status(200)
      .json({ message: "user logged successfully.", token });
  } catch (e) {
    const error = errorMsgHandler(e);
    return res.status(400).json({ error });
  }
};

module.exports = { registerUser, loginUser };
