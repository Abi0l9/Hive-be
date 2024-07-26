const Company = require("../../../models/Company");
const Application = require("../../../models/Company/Application");
const { User } = require("../../../models/User");

const updateAnApplicationStatus = async (req, res) => {
  const { id } = req.user;
  const appId = req.params.appId;
  const body = req.body;

  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const companyId = userExists.company;
    const companyExists = await Company.findById(companyId);

    if (!companyExists) {
      return res.status(404).json({ error: "Company not found." });
    }

    await Application.findByIdAndUpdate(appId, body);

    return res.status(200).json({ message: "Status updated successfully" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = { updateAnApplicationStatus };
