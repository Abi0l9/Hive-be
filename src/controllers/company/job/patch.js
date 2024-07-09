const Job = require("../../../models/Company/Job");
const { User } = require("../../../models/User");
const Company = require("../../../models/Company");

const updateMyCompanyJob = async (req, res) => {
  const { id } = req.user;
  const jobId = req.params.jobId;
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

    const jobExists = await Job.findById(jobId);

    if (!jobExists) {
      return res.status(404).json({ error: "Job history not found." });
    }

    await Job.findByIdAndUpdate(jobId, body);

    return res.status(200).json({ message: "Job  updated successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = { updateMyCompanyJob };
