const Job = require("../models/Company/Job");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate("company", {
      id: 1,
      name: 1,
    });

    return res.status(200).json(jobs);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getAllJobs,
};
