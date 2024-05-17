const { User } = require("../../models/User");
const bcrypt = require("bcrypt");

const updatePersonalInfo = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    await User.findByIdAndUpdate(id, body);
    return res.status(200).json({ message: "User data updated successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const updateUserPassword = async (req, res) => {
  const { id } = req.user;
  const { old_password, new_password } = req.body;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect =
      (await bcrypt.compare(old_password, userExists.passwordHash)) || null;

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Old password is incorrect." });
    }

    const passwordHash = await bcrypt.hash(new_password, 10);

    await User.findByIdAndUpdate(id, { passwordHash });
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = { updatePersonalInfo, updateUserPassword };
