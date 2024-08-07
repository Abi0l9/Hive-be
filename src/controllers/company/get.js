const Company = require("../../models/Company");
const Document = require("../../models/Company/Document");
const { User } = require("../../models/User");

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

const getUserCompany = async (req, res) => {
  const { id } = req.user;

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const userCompany = userExists.company;
    const companyExists = await Company.findById(userCompany);

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

const getMyCompanyDocuments = async (req, res) => {
  const { id } = req.user;

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

    const docs = await Document.find({ company: companyId });

    return res.status(200).json(docs);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getOneCompany,
  getCompanyJobs,
  getUserCompany,
  getMyCompanyDocuments,
};
