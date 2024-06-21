const Company = require("../../../models/Company");
const Job = require("../../../models/Company/Job");
const { User } = require("../../../models/User");

const getMyCompanyJobs = async (req, res) => {
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

    const jobs = await Job.find({ company: companyId });

    return res.status(200).json(jobs);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getMyCompanyJobApplications = async (req, res) => {
  const { id } = req.user;
  const jobId = req.params.jobId;

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

    const job = await Job.findById(jobId).populate("applications");

    if (!job) {
      return res.status(404).json({ error: "Job not found." });
    }

    return res.status(200).json(job.applications);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getAllJobs = async (req, res) => {
  const { id } = req.user;

  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const jobs = await Job.find({}).populate("company", {
      id: 1,
      name: 1,
    });

    return res.status(200).json(jobs);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getOneJob = async (req, res) => {
  const { id } = req.user;
  const jobId = req.params.jobId;

  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const job = await Job.findById(jobId).populate("company", {
      id: 1,
      name: 1,
    });

    return res.status(200).json(job);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getMyCompanyJobs,
  getAllJobs,
  getOneJob,
  getMyCompanyJobApplications,
};
