const Company = require("../../models/Company");

const getOneCompany = async (req, res) => {
  const { id } = req.user;
  const companyId = req.params.companyId;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const companyExists = await Company.findById(companyId);

    if (!companyExists) {
      return res.status(404).json({ error: "Company not found." });
    }

    return res.status(200).json(companyExists);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getCompanyJobs = async (req, res) => {
  const { id } = req.user;
  const companyId = req.params.companyId;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const companyExists = await Company.findById(companyId).populate("jobs");

    if (!companyExists) {
      return res.status(404).json({ error: "Company not found." });
    }

    const jobs = companyExists.jobs;

    return res.status(200).json(jobs);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = { getOneCompany, getCompanyJobs };
